const expressAsyncHandler = require('express-async-handler');
const BookView = require('../views/book.view');
const Book = require('../books/book');
const formatTypes = require('../config/formatTypes');

const createBookRequest = expressAsyncHandler(async (req, res) => {
  const { format = formatTypes.json } = req.query;

  const view = BookView.getView(format);

  const { title, author, description } = req.body;

  const book = await Book.create({ title, author, description });

  if (!book) throw Error(`Error creating ${title}`);

  return res.status(200).type(format).send(view(book));
});

module.exports = createBookRequest;
