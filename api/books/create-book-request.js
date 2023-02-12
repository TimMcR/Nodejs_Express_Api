const expressAsyncHandler = require('express-async-handler');
const { BookView, ViewFormats } = require('../views/book.view');
const Book = require('./book');
const formatTypes = require('../config/formatTypes');

const createBookRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  //TODO extract this to custom error for errorHandler
  if (!ViewFormats.includes(format)) throw Error('Format type not supported');

  const { title, author, description } = req.body;

  const book = await Book.create({ title, author, description });

  if (!book) throw Error(`Error creating ${title}`);

  return res.status(200).type(format).send(BookView(book, format));
});

module.exports = createBookRequest;
