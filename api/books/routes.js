const express = require('express');
const router = express.Router();
const getAllBooksRequest = require('./get-all-books-request');
const getBookRequest = require('./get-book-request');

router.get('/', getAllBooksRequest);

router.get('/:id', getBookRequest);

module.exports = router;
