import difflib
import requests

#document2_url looking at artist's song

def fetch_document_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch document from {url}: {e}")
        return None

def compare_documents(document1_url, document2_url):
    document1_content = fetch_document_content(document1_url)
    document2_content = fetch_document_content(document2_url)

    if document1_content is None or document2_content is None:
        return

    # Tokenize the documents for comparison
    document1_lines = document1_content.splitlines()
    document2_lines = document2_content.splitlines()

    # Compute the similarity ratio
    similarity_ratio = difflib.SequenceMatcher(None, document1_lines, document2_lines).ratio()

    if similarity_ratio > 0.8:
        return ("Plagiarism detected! Similarity ratio:", similarity_ratio)
    else:
        return ("No significant plagiarism detected. Similarity ratio:", similarity_ratio)

if __name__ == "__main__":
    document1_url = "https://open.spotify.com/"
    document2_url = "https://genius.com/Queen-bohemian-rhapsody-lyrics"

    compare_documents(document1_url, document2_url)
