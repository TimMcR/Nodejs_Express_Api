const expressAsyncHandler = require('express-async-handler');
const Book = require('../books/book');
const formatTypes = require('../config/formatTypes');
const { BooksView, ViewFormats } = require('../views/admin.books.view');

const getAllBooksRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  //TODO extract this to custom error for errorHandler
  if (!ViewFormats.includes(format)) throw Error('Format type not supported');

  const books = await Book.find({});

  return res.status(200).type(format).send(BooksView(books, format));
});

module.exports = getAllBooksRequest;
