import express from 'express';
const app = express();
const port = 4001;
app.get('/', (req, res) => {
  res.send('gateway is running');
});
app.listen(port, () => {
  console.log('gateway listening on port ' + port);
});
