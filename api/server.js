require('dotenv').config();
const express = require('express');
require('colors');

const app = express();

//middleware
app.use(express.json());

//healthcheck
app.get('/healthcheck', (req, res) => {
  res.status(200).send('API is up and running 😄👍');
});

//routes

//listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API running and listening on port ${PORT}`.blue);
});
