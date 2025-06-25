import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# 🔊 Main function to generate speech
def generate_nurse_betty_mp3(text, voice="nova", filename="nurse_betty.mp3"):
    try:
        response = openai.audio.speech.create(
            model="tts-1",
            voice=voice,
            input=text
        )
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"✅ MP3 saved as: {filename}")
        return True
    except Exception as e:
        print("❌ Error generating MP3:", e)
        return False
