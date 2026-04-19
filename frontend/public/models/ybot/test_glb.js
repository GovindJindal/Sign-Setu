const fs = require('fs');

const data = fs.readFileSync('ybot.glb');
// The first 12 bytes are the GLB header
const magic = data.readUInt32LE(0);
const version = data.readUInt32LE(4);
const length = data.readUInt32LE(8);

// The next 8 bytes are the chunk 0 header
const chunkLength = data.readUInt32LE(12);
const chunkType = data.readUInt32LE(16);

// The chunk 0 data is a JSON string
let jsonString = data.toString('utf8', 20, 20 + chunkLength);

// remove padding
const firstBrace = jsonString.indexOf('{');
const lastBrace = jsonString.lastIndexOf('}');
if(firstBrace !== -1 && lastBrace !== -1){
    jsonString = jsonString.substring(firstBrace, lastBrace + 1);
}

const gltf = JSON.parse(jsonString);
const nodeNames = gltf.nodes.map(n => n.name).filter(n => n && n.toLowerCase().includes('hand'));
console.log("Hand bones in GLB:");
console.log(nodeNames);
