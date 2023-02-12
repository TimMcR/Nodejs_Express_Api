const expressAsyncHandler = require('express-async-handler');
const BooksView = require('../views/books.view');
const Book = require('./book');

const getAllBooksRequest = expressAsyncHandler(async (req, res) => {
  const books = await Book.find({});

  const { format = 'json' } = req.query;

  return res.status(200).send(BooksView(books, format));
});

module.exports = getAllBooksRequest;
