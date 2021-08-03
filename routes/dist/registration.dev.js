"use strict";

var express = require('express');

var router = express.Router();

var passport = require('../passport/passport');

var apiVerison = 'v1';

var controller = require('../controller/controller');

router.post('/' + apiVerison + '/sendcode', controller.RenderSendCode);
router.post('/' + apiVerison + '/register', controller.RenderRegistration);
router.post('/' + apiVerison + '/confimpass', controller.RenderConfimPassword);
router.post('/' + apiVerison + '/login', controller.RenderAuth);
router.post('/' + apiVerison + '/addPost', controller.RenderCreateTable);
router.post('/' + apiVerison + '/del', controller.RenderDeleteUser);
router.post('/' + apiVerison + '/pdf', controller.getPdf);
router.get('/' + apiVerison + '/getuser', passport.authenticate('jwt', {
  session: false
}), controller.RenderUserInformation);
router.get('/' + apiVerison + '/getallPost', controller.RenderlistPost);
module.exports = router;