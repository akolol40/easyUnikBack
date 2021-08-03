"use strict";

var moogoose = require('mongoose');

var Schema = moogoose.Schema;

var usersDB = require('../mongo/usDb');

var Table = new Schema({
  title: {
    type: String,
    required: true
  },
  header: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});
module.exports = usersDB.model('Table', Table);