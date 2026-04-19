import requests

url = "http://localhost:8000/api/process/"
files = {'file': ('dummy.mp3', b'placeholder audio content', 'audio/mpeg')}
data = {'category': 'audio'}

try:
    response = requests.post(url, files=files, data=data)
    print(f"Status: {response.status_code}")
    print(response.json())
except Exception as e:
    print(e)
