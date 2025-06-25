import os
from serpapi import GoogleSearch
from dotenv import load_dotenv

# Load SerpAPI key from .env file
load_dotenv()
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

def search_trusted_sources(query):
    if not SERPAPI_API_KEY:
        raise ValueError("Please set your SERPAPI_API_KEY in the .env file.")

    params = {
        "engine": "google",
        "q": f"{query} site:cdc.gov OR site:nih.gov OR site:mayoclinic.org OR site:diabetes.org",
        "api_key": SERPAPI_API_KEY,
        "num": 5
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    articles = results.get("organic_results", [])

    summaries = []
    for article in articles:
        title = article.get("title", "No title found")
        link = article.get("link", "#")
        snippet = article.get("snippet", "No summary available")
        summaries.append(f"📰 {title}\n🔗 {link}\n📌 {snippet}\n")

    return "\n\n".join(summaries) if summaries else "No trusted articles found."

# For testing in terminal
if __name__ == "__main__":
    print("🔎 Welcome to Nurse Betty’s Research Assistant")
    user_query = input("Enter your health question: ")
    result = search_trusted_sources(user_query)
    print("\n📋 Nurse Betty found:\n")
    print(result)
