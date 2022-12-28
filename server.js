const express = require('express');
const app = express();
const port = 1234;

app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200);
  res.send('<h1>Hello World 123</h1>');
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
})