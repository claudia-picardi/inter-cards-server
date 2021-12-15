import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send("Il mattino ha l'oro in bocca");
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
}).on('error', (err: Error) => {
  console.log(err);
});
