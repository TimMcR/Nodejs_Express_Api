const formatTypes = require('../config/formatTypes');
const ViewBuilder = require('./ViewBuilder');

const BooksView = new ViewBuilder(true);

BooksView.addView(formatTypes.json, (books) => {
  return {
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
  };
});

BooksView.addView(formatTypes.text, (books) => {
  return books
    .map((book, index) => {
      const { title, author, description, _id: id } = book;
      return `Title #${
        index + 1
      }: ${title}. By ${author}. Description: ${description}. ID: ${id}`;
    })
    .toString();
});

BooksView.addView(formatTypes.xml, (books) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
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
          </booklist>`;
});

module.exports = BooksView;
