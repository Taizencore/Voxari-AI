import express from 'express';
const app = express();
const port = 4000;
app.get('/', (req, res) => {
  res.send('api is running');
});
app.listen(port, () => {
  console.log('api listening on port ' + port);
});
