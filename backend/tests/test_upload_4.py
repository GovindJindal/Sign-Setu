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

req1 = {
    "audio_url": "https://storage.googleapis.com/aai-web-samples/news.mp4",
    "speech_model": "best"
}
resp1 = requests.post("https://api.assemblyai.com/v2/transcript", json=req1, headers=headers)
print("Req1 best:", resp1.json())

req2 = {
    "audio_url": "https://storage.googleapis.com/aai-web-samples/news.mp4",
    "speech_models": ["universal-2"]
}
resp2 = requests.post("https://api.assemblyai.com/v2/transcript", json=req2, headers=headers)
print("Req2 universal:", resp2.json())
