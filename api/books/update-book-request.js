const expressAsyncHandler = require('express-async-handler');
const BookView = require('../views/book.view');
const Book = require('./book');
const mongoose = require('mongoose');

const updateBookRequest = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title, author, description } = req.body;

  const book = await Book.findByIdAndUpdate(
    id,
    { title, author, description },
    { new: true },
  );

  if (!book) {
    const errors = new mongoose.Error.DocumentNotFoundError('Book Not Found');
    return res.status(404).json({
      errors,
    });
  }

  req.data = book;

  next();
});

module.exports = updateBookRequest;
