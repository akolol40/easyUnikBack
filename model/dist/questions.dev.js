"use strict";

var sequelize = require('../mongo/sq');

var Sequelize = require("sequelize");

var question = sequelize.define("question", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  id_Brief: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Question: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = question;