const formatTypes = require('../config/formatTypes');

const ViewFormats = [
  formatTypes.json,
  formatTypes.text,
  formatTypes.html,
  formatTypes.xml,
];

const BooksView = (books, format) => {
  switch (format) {
    case formatTypes.json:
      return {
        data: books.map((book) => {
          const { title, author, description, _id: id } = book;
          return {
            title,
            author,
            description,
            id,
            links: {
              href: `/admin/books/${id}`,
              ref: `/admin/books`,
              type: 'GET',
            },
          };
        }),
      };
    case formatTypes.text:
      return books
        .map((book, index) => {
          const { title, author, description, _id: id } = book;
          return `Title #${
            index + 1
          }: ${title}. By ${author}. Description: ${description}. ID: ${id}`;
        })
        .toString();

    case formatTypes.html:
      return `
          <div>
            <ul>
              ${books
                .map((book) => {
                  const { title, author, description, _id: id } = book;
                  return `<li>
                    <h2>${title}</h2>
                    <h3>By: ${author}</h3>
                    <p>Description: ${description}</p>
                    <p>ID:${id}</p>
                    <a href="http://localhost:4000/admin/books/${id}?format=html">Edit</a>
                  </li>`;
                })
                .join('')}
          </ul>
          </div>`;
    case formatTypes.xml:
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
  }
};

module.exports = { BooksView, ViewFormats };
