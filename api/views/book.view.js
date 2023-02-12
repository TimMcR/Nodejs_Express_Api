const BookView = (book, format = 'json') => {
  switch (format) {
    case 'json':
      return {
        data: book,
      };
    case 'text':
      return `${JSON.stringify(book)}`;
    case 'html':
      return `
        <div>
          <h1>${book.title}</h1>
          <h2>By ${book.author}</h2>
          ${
            book.description
              ? `
          <h3>Description: </h3>
          <p>${book.description}</p>
          `
              : ``
          }
          <p>Id: ${book._id}</p>
        </div>
    `;
    default:
      return 'Format Type is not Supported';
  }
};

module.exports = BookView;
