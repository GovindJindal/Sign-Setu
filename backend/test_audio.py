import requests
import json

url = "http://localhost:8000/api/process/"
# We will use test_upload.py but let's test if the server is running first
try:
    res = requests.get('http://localhost:8000/')
    print("Server is up")
except requests.exceptions.ConnectionError:
    print("Server is down")
