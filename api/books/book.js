const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TITLE_MIN_LENGTH = 4;
const TITLE_MAX_LENGTH = 256;

const AUTHOR_MIN_LENGTH = 4;
const AUTHOR_MAX_LENGTH = 256;

const DESCRIPTION_MAX_LENGTH = 10000;

//schema
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      minLength: TITLE_MIN_LENGTH,
      maxLength: TITLE_MAX_LENGTH,
    },
    author: {
      type: String,
      required: true,
      minLength: AUTHOR_MIN_LENGTH,
      maxLength: AUTHOR_MAX_LENGTH,
    },
    description: {
      type: String,
      maxLength: DESCRIPTION_MAX_LENGTH,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Book', bookSchema);
