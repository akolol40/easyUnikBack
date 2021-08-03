"use strict";

var mongo = require('../mongo/usDb');

var Schema = mongo.Schema;
var Post = new Schema({
  email: {
    type: String
  },
  link: {
    type: String
  },
  header: {
    type: String
  },
  areaText: {
    type: String
  },
  fio: {
    type: String
  }
}, {
  versionKey: false
});
module.exports = mongo.model('post', Post);