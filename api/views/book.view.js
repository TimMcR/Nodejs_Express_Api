const formatTypes = require('../config/formatTypes');
const ViewBuilder = require('./ViewBuilder');

const BookView = new ViewBuilder(true);

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
