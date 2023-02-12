const expressAsyncHandler = require('express-async-handler');
const Book = require('./book');

const getAllBooksRequest = expressAsyncHandler(async (req, res, next) => {
  const books = await Book.find({});

  req.data = books;

  next();
});

module.exports = getAllBooksRequest;
