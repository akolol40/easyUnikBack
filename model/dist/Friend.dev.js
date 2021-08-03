"use strict";

var Friend = require('../mongo/usDb');

var Schema = Friend.Schema;
var friend = new Schema({
  email: {
    type: String
  },
  friendEmail: {
    type: String
  },
  name: String,
  middlename: String,
  link: String
}, {
  versionKey: false
});
module.exports = Friend.model('friend', friend);