"use strict";

var sequelize = require('../mongo/sq');

var Sequelize = require("sequelize");

var Us = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = Us;