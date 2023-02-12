const express = require('express');
const router = express.Router();
const createBookRequest = require('./create-book-request');
const deleteBookRequest = require('./delete-book-request');
const getAllBooksRequest = require('./get-all-books-request');
const getBookRequest = require('./get-book-request');
const updateBookRequest = require('./update-book-request');

router.get('/', getAllBooksRequest);

router.get('/:id', getBookRequest);

router.post('/', createBookRequest);

router.put('/:id', updateBookRequest);

router.delete('/:id', deleteBookRequest);

module.exports = router;
