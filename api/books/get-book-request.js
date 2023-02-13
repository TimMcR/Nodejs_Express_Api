const expressAsyncHandler = require('express-async-handler');
const BookView = require('../views/book.view');
const Book = require('./book');
const mongoose = require('mongoose');
const formatTypes = require('../config/formatTypes');

const getBookRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  const view = BookView.getView(format);

  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    const errors = new mongoose.Error.DocumentNotFoundError('Book Not Found');
    return res.status(404).json({
      errors,
    });
  }

  return res.status(200).type(format).send(view(book));
});

module.exports = getBookRequest;
