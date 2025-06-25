# generate_openai_mp3.py

import openai
import os
from dotenv import load_dotenv

# Load .env file to securely access API key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_nurse_betty_mp3(text, filename="nurse_betty.mp3"):
    try:
        response = openai.audio.speech.create(
            model="tts-1",
            voice="nova",
            input=text
        )
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"✅ MP3 saved as: {filename}")
        return True
    except Exception as e:
        print(f"❌ Error generating MP3: {e}")
        return False

# Optional test run
if __name__ == "__main__":
    sample_text = "Welcome to Lookingin.me — your health and happiness matter!"
    generate_nurse_betty_mp3(sample_text)
