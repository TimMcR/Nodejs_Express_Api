const expressAsyncHandler = require('express-async-handler');
const Book = require('./book');
const BooksView = require('../views/books.view');
const formatTypes = require('../config/formatTypes');

const getAllBooksRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  const view = BooksView.getView(format);

  const books = await Book.find({});

  if (format === formatTypes.html) {
    return res.render('books', { books });
  }

  return res.status(200).type(format).send(view(books));
});

module.exports = getAllBooksRequest;
