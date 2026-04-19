import json
import struct

with open('ybot.glb', 'rb') as f:
    f.read(12)
    chunk_length = struct.unpack('<I', f.read(4))[0]
    f.read(4)
    gltf_json = json.loads(f.read(chunk_length).decode('utf-8'))
    nodes = gltf_json.get('nodes', [])
    names = [node.get('name', '') for node in nodes]
    print(names)
