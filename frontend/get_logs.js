const https = require('https');
https.get('https://api.vercel.com/v6/deployments?projectId=prj_vQkHqMAdS9gJnH8DFHgzWaLmF0SM&limit=1', {
  headers: {
    'Authorization': 'Bearer vca_0XuHlGkvlDYU9gLIAw1WSqmMvqMQfhZ2Qk9GF2YXFBrMl2pQvZ2pDBCK'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const deps = JSON.parse(data).deployments;
    if(deps.length > 0) {
      const url = `https://api.vercel.com/v2/deployments/${deps[0].uid}/events`;
      https.get(url, { headers: { 'Authorization': 'Bearer vca_0XuHlGkvlDYU9gLIAw1WSqmMvqMQfhZ2Qk9GF2YXFBrMl2pQvZ2pDBCK'} }, (res2) => {
         let data2 = ''; res2.on('data', c => data2 += c);
         res2.on('end', () => {
             const evts = JSON.parse(data2);
             evts.forEach(e => {
                if (e.payload && e.payload.text) console.log(e.payload.text);
             });
         });
      });
    }
  });
});
