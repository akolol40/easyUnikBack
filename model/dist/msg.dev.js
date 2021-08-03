"use strict";

var Avatar = require('../mongo/usDb');

var Schema = Avatar.Schema;
var MsgoSchema = Schema({
  msg: {
    type: String,
    trim: true
  },
  buf: [{
    d: Buffer,
    t: String,
    n: String
  }],
  by: {
    type: Avatar.Schema.ObjectId,
    ref: 'User'
  },
  to: {
    type: Avatar.Schema.Types.ObjectId,
    ref: 'Org'
  },
  date: {
    type: Date,
    "default": Date.now
  },
  edited: {
    type: Boolean
  }
});
module.exports = Avatar.model('msgoscheMA', MsgoSchema);