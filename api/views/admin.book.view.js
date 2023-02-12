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
          <h1>Edit ${title}</h1>
          <h3>Id: ${id}</h3>
          <form
            action="http://localhost:4000/admin/books/${id}?format=html" 
            method="PUT"
          >
          <label for="title">Title</label>
            <input name="title" id="title" value="${title}">
            <div>
              <input
                type="button"
                onclick="location.href='http://localhost:4000/admin/books?format=html'"
                value="Cancel"
              />
              <input type="Submit" value="Update"/>
            </div>
          </form>
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
