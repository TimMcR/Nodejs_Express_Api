const expressAsyncHandler = require('express-async-handler');
const BookView = require('../views/book.view');
const Book = require('../books/book');
const mongoose = require('mongoose');
const formatTypes = require('../config/formatTypes');
const createHttpError = require('http-errors');

const deleteBookRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  const view = BookView.getView(format);

  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    createHttpError(404, 'Book Not Found');
  }

  return res.status(200).type(format).send(view(book));
});

module.exports = deleteBookRequest;
