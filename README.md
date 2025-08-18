# Medical-chatbot-GenAI

A Generative AI-powered medical chatbot that answers user queries using information extracted from medical PDFs. The project uses LangChain, Pinecone, and OpenAI for document retrieval and conversational AI.

## Features

- Conversational medical assistant web interface
- PDF ingestion and embedding using LangChain and OpenAI
- Vector search powered by Pinecone
- Flask backend with REST API
- Custom prompts and retrieval chains
- Responsive chat UI

## Project Structure

- `app.py` — Flask web server and main API logic
- `store_index.py` — Script to extract data from PDFs, create embeddings, and initialize Pinecone index
- `src/helper.py` — Helper functions for PDF loading, text splitting, and embedding creation
- `src/prompt.py` — Custom prompt templates for the chatbot
- `templates/index.html` — Chatbot web UI
- `static/script.js`, `static/style.css` — Frontend scripts and styles
- `data/` — Directory for medical PDF files
- `research/trials.ipynb` — Jupyter notebook for experimentation and data extraction

## Setup

1. **Clone the repository**

   ```sh
   git clone <repo-url>
   cd Medical-chatbot-GenAI
   ```

2. **Install dependencies**

   ```sh
   pip install -r requirements.txt
   ```

3. **Set environment variables**

   Create a `.env` file (or edit `.env.local`) with your API keys:

   ```
   OPENAI_API_KEY=your-openai-key
   PINECONE_API_KEY=your-pinecone-key
   ```

4. **Prepare the Pinecone index**

   Run the index setup script:

   ```sh
   python store_index.py
   ```

5. **Start the Flask app**

   ```sh
   python app.py
   ```

6. **Access the chatbot**

   Open [http://localhost:5000](http://localhost:5000) in your browser.

## Usage

- Type your medical question in the chat window.
- The bot will respond using information retrieved from the ingested medical PDFs.

## Requirements

See [`requirements.txt`](requirements.txt) for all dependencies.

## License

MIT License. See [`LICENSE`](LICENSE) for details.

---

**Author:** Adil