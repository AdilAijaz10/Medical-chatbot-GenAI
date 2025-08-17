from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings


#Extract the Data from the PDF File

def load_pdf_file(data):
    loader = DirectoryLoader(data, glob="*.pdf", loader_cls=PyPDFLoader)
    documents = loader.load()
    return documents

# Split the documents into Text chunks
def text_split(extracted_documents):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=20)
    text_chunks = text_splitter.split_documents(extracted_documents)
    return text_chunks

# Create Embeddings for the Text chunks
def create_embeddings(text_chunks):
    # Extract text from Document objects
    texts = [chunk.page_content if hasattr(chunk, "page_content") else str(chunk) for chunk in text_chunks]
    from langchain_openai import OpenAIEmbeddings  # Use the correct import
    OpenAI_embedding = OpenAIEmbeddings()
    embeddings = OpenAI_embedding.embed_documents(texts)
    return embeddings

