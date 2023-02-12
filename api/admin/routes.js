const express = require('express');
const router = express.Router();
const createBookRequest = require('./admin-create-book-request');
const deleteBookRequest = require('./admin-delete-book-request');
const updateBookRequest = require('./admin-update-book-request');
const getAllBooksRequest = require('./admin-get-all-books-request');
const getBookRequest = require('./admin-get-book-request');

router.get('/', getAllBooksRequest);

router.get('/:id', getBookRequest);

router.post('/', createBookRequest);

router.put('/:id', updateBookRequest);

router.delete('/:id', deleteBookRequest);

module.exports = router;
