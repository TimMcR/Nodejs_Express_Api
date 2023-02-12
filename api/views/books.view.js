const expressAsyncHandler = require('express-async-handler');

const BooksView = expressAsyncHandler((req, res) => {
  const { format = 'json' } = req.query;

  const books = req.data;

  switch (format) {
    case 'json':
      return res.status(200).json({
        data: books.map((book) => {
          const { title, author, description, _id: id } = book;
          return {
            title,
            author,
            description,
            id,
            links: {
              href: `/books/${id}`,
              ref: `books`,
              type: 'GET',
            },
          };
        }),
      });
    case 'text':
      return res.status(200).send(
        books
          .map((book, index) => {
            const { title, author, description, _id: id } = book;
            return `Title #${
              index + 1
            }: ${title}. By ${author}. Description: ${description}. ID: ${id}`;
          })
          .toString(),
      );
    case 'html':
      return res.status(200).type('html').send(`
          <div>
            <ul>
              ${books
                .map((book) => {
                  const { title, author, description, _id: id } = book;
                  return `<li>
                    <h2>${title}</h2>
                    <h3>By: ${author}</h3>
                    <p>Description: ${description}</p>
                    <p>ID:
                      <a href="http://localhost:4000/books/${id}?format=html">
                        ${id}
                      </a>
                    </p>
                  </li>`;
                })
                .join('')}
          </ul>
          </div>`);
    case 'xml':
      return res.status(200).type('xml')
        .send(`<?xml version="1.0" encoding="UTF-8"?>
          <booklist>
            ${books.map((book) => {
              const { title, author, description, _id: id } = book;
              return `<book>
                <title>${title}</title>
                <author>${author}</author>
                <description>${description}</description>
                <id>${id}</id>
              </book>`;
            })}
          </booklist>`);
    default:
      return res
        .status(400)
        .send(`Format type '${format}' is not supported for this request`);
  }
});

module.exports = BooksView;
