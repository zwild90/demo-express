import express from 'express';
const app = express();

app.get('/', function (req, res) {
  res.send('endpoint 0');
});

app.get('/one', function (req, res) {
  res.send('GET: endpoint 1');
});

app.post('/two', function (req, res) {
  res.send('POST: endpoint 2');
});

app.put('/three', function (req, res) {
  res.send('PUT: endpoint 3');
});

app.delete('/four', function (req, res) {
  res.send('DELETE: endpoint 4');
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:30000`);
});
