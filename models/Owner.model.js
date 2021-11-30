const Schema = require('mongoose').Schema;
const db = require('../db/database');

const Owner = db.model(
  'Owner',
  {
    name: String,
    birthday: String,
    address: String,
    phonenumber: Number
  }
);

module.exports = Owner;