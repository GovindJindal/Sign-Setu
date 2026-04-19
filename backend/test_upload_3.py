import requests
import json
import os
from dotenv import load_dotenv
load_dotenv(".env")
api_key = os.getenv("ASSEMBLYAI_API_KEY")

headers = {
    "authorization": api_key,
    "content-type": "application/json"
}
# Using an arbitrary URL. AssemblyAI doesn't strictly check audio_url immediately if the payload schema fails.
req1 = {
    "audio_url": "https://storage.googleapis.com/aai-web-samples/news.mp4",
    "speech_model": "best"
}
req2 = {
    "audio_url": "https://storage.googleapis.com/aai-web-samples/news.mp4",
}
resp2 = requests.post("https://api.assemblyai.com/v2/transcript", json=req2, headers=headers)
print("Req2:", resp2.json())
