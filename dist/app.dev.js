"use strict";

var express = require('express');

var Moongose = require('mongoose');

var dbConfig = require('./config/db');

var bodyParser = require('body-parser');

var passport = require('./passport/passport');

var cookieParser = require('cookie-parser');

var session = require('express-session');

var MongoStore = require('connect-mongodb-session')(session);

var cors = require('cors');

var multer = require('multer');
/*Moongose.createConnection(dbConfig.db.users, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  console.log(err)
})*/


var app = express();
var store = new MongoStore({
  uri: dbConfig.db.users,
  collection: 'Sessions'
});
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({
  dest: 'uploads'
}).single('filedata'));
app.use('/api', require('./routes/registration.js'));
app.listen(3000);