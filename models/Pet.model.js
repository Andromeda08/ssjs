const Schema = require('mongoose').Schema;
const db = require('../db/database');

const Pet = db.model(
  'Pet',
  {
    name: String,
    birthday: String,
    species: String,
    sex: String,
    _owner: {
      type: Schema.Types.ObjectId,
      ref: 'Owner'
    }
  }
);

module.exports = Pet;