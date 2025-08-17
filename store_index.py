# run this file before executing the application
from src.helper import load_pdf_file, text_split, create_embeddings
from pinecone.grpc import PineconeGRPC as pinecone
from pinecone import ServerlessSpec
from pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv
import os  

load_dotenv() 
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY

extracted_data = load_pdf_file(data='data/')
text_chunks = text_split(extracted_data)
embedding = OpenAIEmbeddings()
embeddings = create_embeddings(text_chunks)

# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

index_name = "medical-chatbot"
if index_name not in pc.list_indexes():
    try:
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
    except Exception as e:
        print(f"Index creation error: {e}")

dosearch = PineconeVectorStore.from_documents(
    documents=text_chunks,
    index_name=index_name,
    embedding=embedding  
)
