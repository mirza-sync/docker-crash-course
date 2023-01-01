const { Client } = require('pg');
const express = require('express');
const app = express();
const port = 1000;

const client = new Client({
  password: 'root',
  user: 'root',
  host: 'postgres',
});

app.use(express.static('public'));

app.get('/employees', async (req, res) => {
  const results = await client
  .query('SELECT * FROM employees')
  .then((payload) => {
    return payload.rows;
  })
  .catch(() => {
    throw new Error('Query failed');
  });

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(results));
});

// The app must connects to the database before it starts, so
// we wrap the this in IIFE (immediately invoked function expression),
// so that we can wait asynchronously for the database connection
// to be established before listening
(async () => {
  await client.connect();

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
})();


// The promise below will fail on node 16 (Unhandled rejection error)
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Good');
  }, 300);
  reject('Bad');
});

myPromise.then(() => {
  console.log('This will never run');
})
