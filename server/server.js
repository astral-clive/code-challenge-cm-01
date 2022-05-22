const express = require('express');
const data = require('./navigation.json');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Server Running'));
// not ideal but a locally served json file of cities is hardly an issue
app.get('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.send(data);
});


app.listen(port);
console.log('Server started at http://localhost:' + port);