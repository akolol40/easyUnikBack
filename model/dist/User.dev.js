"use strict";

var moogoose = require('mongoose');

var Schema = moogoose.Schema;

var usersDB = require('../mongo/usDb');

var User = new Schema({
  email: {
    type: String
  },
  pwd: {
    type: String,
    "default": 'kristik'
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  faculty: {
    type: String
  },
  Unic: {
    type: String
  },
  Napr: {
    type: String
  }
}, {
  versionKey: false
});
module.exports = usersDB.model('User', User);