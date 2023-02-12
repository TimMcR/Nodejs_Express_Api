const BooksView = (books, format) => {
  switch (format) {
    case 'json':
      return { data: books };
    case 'text':
      return books
        .map(
          (book, index) =>
            `Title ${index + 1}: ${book.title}. Extra info: ${JSON.stringify(
              book,
            )}`,
        )
        .toString();
    case 'html':
      return `
          <ul>
            ${books
              .map((book) => {
                return `<li>${JSON.stringify(book)}</li>`;
              })
              .join('')}
          </ul>`;
    default:
      return 'Format Type is not Supported';
  }
};

module.exports = BooksView;
