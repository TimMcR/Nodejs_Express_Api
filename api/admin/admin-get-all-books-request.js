const expressAsyncHandler = require('express-async-handler');
const Book = require('../books/book');
const formatTypes = require('../config/formatTypes');
const BooksView = require('../views/admin.books.view');

const getAllBooksRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  const view = BooksView.getView(format);

  const books = await Book.find({});

  return res.status(200).type(format).send(view(books));
});

module.exports = getAllBooksRequest;
