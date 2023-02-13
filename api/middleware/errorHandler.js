const mongoose = require('mongoose');
const { isHttpError } = require('http-errors');

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

  if (err instanceof mongoose.Error.CastError) {
    return res.status(404).send(`ID: ${err.value} is not valid`);
  }

  if (isHttpError(err)) {
    return res.status(err.status).send(err.message);
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
