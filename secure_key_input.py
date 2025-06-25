import openai
import getpass

# 🔐 Securely prompt for the API key (hidden as you type)
key = getpass.getpass('Paste your OpenAI API Key: ')
openai.api_key = key

# ✅ OPTIONAL TEST: List available OpenAI models
try:
    response = openai.models.list()
    print("✅ Success! Your key is working.")
except Exception as e:
    print("❌ Failed to authenticate:", e)
