const mongoose = require('mongoose');

const express = require('express');

const errorHandler = (err, req, res, next) => {
  console.log(`${err}`.red);

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      errors: {
        ...err.errors,
        _message: err._message,
        name: err.name,
        message: err.message,
      },
    });
  }

  //Unique Key Error
  if (err?.code === 11000) {
    const validationError = new mongoose.Error.ValidationError({
      name: 'Unique Key Validation Error',
      message: 'Unique key error',
    });

    const path = Object.keys(err.keyPattern)[0];
    const value = Object.values(err.keyValue)[0];

    validationError.addError(
      path,
      new mongoose.Error.ValidatorError({
        path,
        message: `Path '${path}' already exists`,
        type: 'unique',
        value,
      }),
    );

    return res.status(400).json(validationError);
  }

  return res.status(500).send('Something went wrong, please try again later');
};

module.exports = errorHandler;
