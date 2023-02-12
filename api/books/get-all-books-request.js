const expressAsyncHandler = require('express-async-handler');
const Book = require('./book');
const { BooksView, ViewFormats } = require('../views/books.view');
const formatTypes = require('../config/formatTypes');

const getAllBooksRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  //TODO extract this to custom error for errorHandler
  if (!ViewFormats.includes(format)) throw Error('Format type not supported');

  const books = await Book.find({});

  return res.status(200).type(format).send(BooksView(books, format));
});

module.exports = getAllBooksRequest;
