const expressAsyncHandler = require('express-async-handler');
const BookView = require('../views/book.view');
const Book = require('./book');
const mongoose = require('mongoose');

const deleteBookRequest = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    const errors = new mongoose.Error.DocumentNotFoundError('Book Not Found');
    return res.status(404).json({
      errors,
    });
  }

  req.data = book;

  next();
});

module.exports = deleteBookRequest;
