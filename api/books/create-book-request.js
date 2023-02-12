const expressAsyncHandler = require('express-async-handler');
const BookView = require('../views/book.view');
const Book = require('./book');

const createBookRequest = expressAsyncHandler(async (req, res, next) => {
  const { title, author, description } = req.body;

  const book = await Book.create({ title, author, description });

  if (!book) throw Error(`Error creating ${title}`);

  req.data = book;

  next();
});

module.exports = createBookRequest;
