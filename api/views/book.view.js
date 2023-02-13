const formatTypes = require('../config/formatTypes');
const ViewBuilder = require('./ViewBuilder');

const BookView = new ViewBuilder();

BookView.addView(formatTypes.json, (book) => {
  const { title, author, description, _id: id } = book;

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
});

BookView.addView(formatTypes.text, (book) => {
  const { title, author, description, _id: id } = book;

  return `Title: ${title}, By: ${author}. Description: ${description}. ID: ${id}`;
});

BookView.addView(formatTypes.html, (book) => {
  const { title, author, description, _id: id } = book;

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
});

BookView.addView(formatTypes.xml, (book) => {
  const { title, author, description, _id: id } = book;

  return `<?xml version="1.0" encoding="UTF-8"?>
          <book>
            <title>${title}</title>
            <author>${author}</author>
            <description>${description}</description>
            <id>${id}</id>
          </book>`;
});

module.exports = BookView;
