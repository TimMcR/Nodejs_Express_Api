require('dotenv').config();
const express = require('express');
require('colors');

const app = express();

//middleware
app.use(express.json());

//healthcheck
app.get('/healthcheck', (req, res) => {
  res.status(200).send('API is up and running! 😄👍');
});

//routes

//404
app.all('*', (req, res) => {
  res.status(404).send('404, route not found! 😟');
});

//listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API running and listening on port ${PORT}`.blue);
});
