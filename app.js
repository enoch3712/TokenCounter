// const {encode, decode} = require('gpt-3-encoder')
import express from 'express';
import GPT3NodeTokenizer from "gpt3-tokenizer";

const app = express()
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.text())
app.use(express.json());

app.post('/tokenCount', (req, res) => {
  if(req.query.type != 'gpt3' && req.query.type != 'codex')
  {
    res.status(400).send({message: 'Invalid type'});
    return;
  }

  const tokenizer = new GPT3NodeTokenizer.default({ type: req.query.type });
  const encoded = tokenizer.encode(req.body);

  res.json(200, {
    result: encoded.bpe.length
  });
});

app.listen(port);
console.log(`Example app listening on port ${port}!`)