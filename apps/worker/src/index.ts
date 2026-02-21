import express from 'express';
const app = express();
const port = 4002;
app.get('/', (req, res) => {
  res.send('worker is running');
});
app.listen(port, () => {
  console.log('worker listening on port ' + port);
});
