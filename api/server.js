require('dotenv').config();
require('colors');
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./auth/routes');
const bookRoutes = require('./books/routes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

//middleware
app.use(express.json());

//healthcheck
app.get('/healthcheck', (req, res) => {
  res.status(200).send('API is up and running! 😄👍');
});

//routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

//errors
app.use(errorHandler);

//404
app.all('*', (req, res) => {
  const { format = 'json' } = req.query;

  switch (format) {
    case 'html':
      return res
        .type('html')
        .status(404)
        .sendFile('static/404.html', { root: __dirname });
    default:
      return res.type('json').status(404).send('404, route not found! 😟');
  }
});

//Connect to the database and run API
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Connected to database and listening on port ${PORT}`.blue);
    });
  })
  .catch((error) => {
    console.log(`${error}`.red);
  });
