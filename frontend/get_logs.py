import urllib.request
import json

req = urllib.request.Request(
    'https://api.vercel.com/v6/deployments?projectId=prj_vQkHqMAdS9gJnH8DFHgzWaLmF0SM&limit=1',
    headers={'Authorization': 'Bearer vca_0XuHlGkvlDYU9gLIAw1WSqmMvqMQfhZ2Qk9GF2YXFBrMl2pQvZ2pDBCK'}
)
with urllib.request.urlopen(req) as response:
    deps = json.loads(response.read())['deployments']
    if deps:
        req2 = urllib.request.Request(
            f"https://api.vercel.com/v2/deployments/{deps[0]['uid']}/events",
            headers={'Authorization': 'Bearer vca_0XuHlGkvlDYU9gLIAw1WSqmMvqMQfhZ2Qk9GF2YXFBrMl2pQvZ2pDBCK'}
        )
        with urllib.request.urlopen(req2) as resp2:
            events = json.loads(resp2.read())
            for e in events:
                if 'payload' in e and 'text' in e['payload']:
                    print(e['payload']['text'].strip())
