"use strict";

var sequelize = require('../mongo/sq');

var Sequelize = require("sequelize");

var Brif = sequelize.define("brif", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  ID_User: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Name_brief: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = Brif;