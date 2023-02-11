const bookView = (req, res) => {
  const { data } = res;
  const { format = 'json' } = req.query;

  switch (format) {
    case 'json':
      return res.type('json').status(200).json({ data: data.title });
    case 'html':
      return res.type('html').status(200).send(`
      <div>
        <h2>${data.title}</h2>
        <h3>By ${data.author}</h3>
        <p>${data.description}</p>
      </div>`);
    case 'text':
      return res.type('text').status(200).send(data.title);
    default:
      return res.status(400).send('Content Type Not Supported');
  }
};

module.exports = bookView;
