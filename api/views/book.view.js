const expressAsyncHandler = require('express-async-handler');
const formatTypes = require('../config/formatTypes');

const ViewFormats = [
  formatTypes.json,
  formatTypes.text,
  formatTypes.html,
  formatTypes.xml,
];

const BookView = (book, format) => {
  const { title, author, description, _id: id } = book;

  switch (format) {
    case formatTypes.json:
      return {
        data: {
          title,
          author,
          description,
          id,
          links: {
            href: '/books',
            ref: 'books',
            type: 'GET',
          },
        },
      };
    case formatTypes.text:
      return `Title: ${title}, By: ${author}. Description: ${description}. ID: ${id}`;
    case formatTypes.html:
      return `<div>
          <h1>${title}</h1>
          <h2>By ${author}</h2>
          <h3>Description: </h3>
          <p>${description}</p>
          <p>Id: ${id}</p>
          <a href="http://localhost:4000/books?format=html">
            Back to Book Listing           
          </a>
        </div> `;
    case formatTypes.xml:
      return `<?xml version="1.0" encoding="UTF-8"?>
          <book>
            <title>${title}</title>
            <author>${author}</author>
            <description>${description}</description>
            <id>${id}</id>
          </book>`;
  }
};

module.exports = { BookView, ViewFormats };
