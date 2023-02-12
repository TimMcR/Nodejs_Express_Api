const express = require('express');
const BookView = require('../views/book.view');
const BooksView = require('../views/books.view');
const router = express.Router();
const createBookRequest = require('./create-book-request');
const deleteBookRequest = require('./delete-book-request');
const getAllBooksRequest = require('./get-all-books-request');
const getBookRequest = require('./get-book-request');
const updateBookRequest = require('./update-book-request');

router.get('/', getAllBooksRequest, BooksView);

router.get('/:id', getBookRequest, BookView);

router.post('/', createBookRequest, BookView);

router.put('/:id', updateBookRequest, BookView);

router.delete('/:id', deleteBookRequest, BookView);

module.exports = router;
