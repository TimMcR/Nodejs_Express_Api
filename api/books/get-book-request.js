const expressAsyncHandler = require('express-async-handler');
const BookView = require('../views/book.view');
const Book = require('./book');
const formatTypes = require('../config/formatTypes');
const createHttpError = require('http-errors');

const getBookRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  const view = BookView.getView(format);

  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    createHttpError(404, 'Book Not Found');
  }

  if (format === formatTypes.html) {
    return res.render('book', { book });
  }

  return res.status(200).type(format).send(view(book));
});

module.exports = getBookRequest;
