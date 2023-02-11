const expressAsyncHandler = require('express-async-handler');
const Book = require('./book');

const getAllBooksRequest = expressAsyncHandler(async (req, res) => {
  const books = await Book.find({});

  const { format = 'json' } = req.query;

  switch (format) {
    case 'json':
      return res
        .type('json')
        .status(200)
        .json({ data: books.map((book) => book.title) });
    case 'html':
      return res.type('html').status(200).send(`
          <ul>
            ${books
              .map((book) => {
                return `<li>${book.title}</li>`;
              })
              .join('')}
          </ul>`);
    case 'text':
      return res
        .type('text')
        .status(200)
        .send(
          books
            .map((book, index) => `Title ${index + 1}: ${book.title}`)
            .toString(),
        );
    default:
      return res.status(400).send('Content Type Not Supported');
  }
});

module.exports = getAllBooksRequest;
