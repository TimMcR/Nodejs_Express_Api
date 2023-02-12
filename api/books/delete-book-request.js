const expressAsyncHandler = require('express-async-handler');
const { BookView, ViewFormats } = require('../views/book.view');
const Book = require('./book');
const mongoose = require('mongoose');
const formatTypes = require('../config/formatTypes');

const deleteBookRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  //TODO extract this to custom error for errorHandler
  if (!ViewFormats.includes(format)) throw Error('Format type not supported');

  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    const errors = new mongoose.Error.DocumentNotFoundError('Book Not Found');
    return res.status(404).json({
      errors,
    });
  }

  return res.status(200).type(format).send(BookView(book, format));
});

module.exports = deleteBookRequest;
