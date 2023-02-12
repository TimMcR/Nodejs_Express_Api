const expressAsyncHandler = require('express-async-handler');

const BookView = expressAsyncHandler((req, res) => {
  const { format = 'json' } = req.query;

  const { title, author, description, _id: id } = req.data;

  switch (format) {
    case 'json':
      return res.status(200).json({
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
      });
    case 'text':
      return res
        .status(200)
        .type('text')
        .send(
          `Title: ${title}, By: ${author}. Description: ${description}. ID: ${id}`,
        );
    case 'html':
      return res.status(200).type('html').send(`<div>
          <h1>${title}</h1>
          <h2>By ${author}</h2>
          <h3>Description: </h3>
          <p>${description}</p>
          <p>Id: ${id}</p>
          <a href="http://localhost:4000/books?format=html">
            Back to Book Listing           
          </a>
        </div>
    `);
    case 'xml':
      return res.status(200).type('xml')
        .send(`<?xml version="1.0" encoding="UTF-8"?>
          <book>
            <title>${title}</title>
            <author>${author}</author>
            <description>${description}</description>
            <id>${id}</id>
          </book>`);
    default:
      return res
        .status(400)
        .send(`Format Type '${format}' is not supported for this request`);
  }
});

module.exports = BookView;
