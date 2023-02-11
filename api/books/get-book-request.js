const expressAsyncHandler = require('express-async-handler');
const Book = require('./book');

const getBookRequest = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) throw Error('Book Not Found');

  res.data = book;

  next();
});

module.exports = getBookRequest;
