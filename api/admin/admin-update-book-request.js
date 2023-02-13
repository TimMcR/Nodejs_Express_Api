const expressAsyncHandler = require('express-async-handler');
const BookView = require('../views/book.view');
const Book = require('../books/book');
const mongoose = require('mongoose');
const formatTypes = require('../config/formatTypes');
const createHttpError = require('http-errors');

const updateBookRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  const view = BookView.getView(format);

  const { id } = req.params;

  const { title, author, description } = req.body;

  const book = await Book.findByIdAndUpdate(
    id,
    { title, author, description },
    { new: true },
  );

  if (!book) {
    createHttpError(404, 'Book Not Found');
  }

  return res.status(200).type(format).send(view(book));
});

module.exports = updateBookRequest;
