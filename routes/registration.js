const express = require('express')
const router = express.Router();
const passport = require('../passport/passport')
const apiVerison = 'v1'
const controller = require('../controller/controller')


router.post('/'+apiVerison+'/sendcode', controller.RenderSendCode) 
router.post('/'+apiVerison+'/register', controller.RenderRegistration)
router.post('/'+apiVerison+'/confimpass', controller.RenderConfimPassword)
router.post('/'+apiVerison+'/login', controller.RenderAuth);
router.post('/'+apiVerison+'/addPost', controller.RenderCreateTable)
router.post('/'+apiVerison+'/del', controller.RenderDeleteUser)
router.post('/'+apiVerison+'/pdf', controller.getPdf)


router.get('/'+apiVerison+'/getuser', passport.authenticate('jwt', {session: false}), controller.RenderUserInformation)
router.get('/'+apiVerison+'/getallPost', controller.RenderlistPost)

module.exports = router