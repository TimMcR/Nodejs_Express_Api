require('colors');
const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const Book = require('./book');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  res.status(200).send('Route not implemented yet');
});

router.get('/:id', (req, res) => {
  res.status(200).send('Route not implemented yet');
});

router.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const { title, author, description } = req.body;

    await Book.create({ title, author, description });

    return res.status(201).send(`${title} added.`);
  }),
);

router.put('/:id', (req, res) => {
  res.status(200).send('Route not implemented yet');
});

router.delete('/:id', (req, res) => {
  res.status(200).send('Route not implemented yet');
});

module.exports = router;
