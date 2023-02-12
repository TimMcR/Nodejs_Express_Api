const expressAsyncHandler = require('express-async-handler');
const BookView = require('../views/book.view');
const Book = require('./book');

const createBookRequest = expressAsyncHandler(async (req, res) => {
  const { title, author, description } = req.body;

  const book = await Book.create({ title, author, description });

  if (!book) throw Error(`Error creating ${title}`);

  const { format = 'json' } = req.query;

  return res.status(201).send(BookView(book, format));
});

module.exports = createBookRequest;
