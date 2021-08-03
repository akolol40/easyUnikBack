"use strict";

var bcrypt = require('bcryptjs');

var User = require('../model/User');

var Table = require('../model/Table');

var jwt = require('jsonwebtoken');

var nodeemail = require('nodemailer');

var passport = require('passport');

var _require = require('mongoose'),
    set = _require.set;

var Mongoose = require('../mongo/usDb');

var Schema = Mongoose.Schema;

genToken = function genToken(user) {
  return jwt.sign({
    iss: 'Mihael_kharadjidi',
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
    email: user.email
  }, 'kristik');
};

exports.RenderlistPost = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Table.aggregate([{
            $group: {
              "_id": '$_id',
              title: {
                '$first': "$title"
              },
              header: {
                '$first': "$header"
              },
              text: {
                '$first': "$text"
              }
            }
          }]).exec(function (err, result) {
            res.status(200).json(result);
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.RenderCreateTable = function _callee2(req, res) {
  var _req$body, title, header, text, table;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, header = _req$body.header, text = _req$body.text;
          table = new Table({
            title: title,
            header: header,
            text: text
          });
          _context2.next = 4;
          return regeneratorRuntime.awrap(table.save());

        case 4:
          res.status(200).json({
            status: 'table_create'
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.RenderSendCode = function _callee4(req, res) {
  var _req$body2, email, code, number;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, code = _req$body2.code;
          number = 0;
          console.log(email);
          number = parseInt(code);
          _context4.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).then(function _callee3(user) {
            var transporter, result;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!user) {
                      _context3.next = 4;
                      break;
                    }

                    res.status(400).json({
                      status: "error",
                      massage: "reg"
                    });
                    _context3.next = 20;
                    break;

                  case 4:
                    if (isNaN(number)) {
                      _context3.next = 19;
                      break;
                    }

                    console.log(user);
                    transporter = nodeemail.createTransport({
                      host: '194-67-86-108.cloudvps.regruhosting.ru',
                      port: '587',
                      secute: false,
                      auth: {
                        user: 'admin@thewicker.ru',
                        pass: '10442711qweF'
                      },
                      tls: {
                        rejectUnauthorized: false
                      }
                    });
                    _context3.prev = 7;
                    _context3.next = 10;
                    return regeneratorRuntime.awrap(transporter.sendMail({
                      from: '"Код подтверждения" <admin@thewicker.ru>',
                      to: email,
                      subject: "admin@thewicker.ru",
                      text: number.toString()
                    }));

                  case 10:
                    result = _context3.sent;
                    res.status(200).json({
                      status: 'ok',
                      message: number
                    });
                    _context3.next = 17;
                    break;

                  case 14:
                    _context3.prev = 14;
                    _context3.t0 = _context3["catch"](7);
                    return _context3.abrupt("return", console.log(_context3.t0.name, _context3.t0.message));

                  case 17:
                    _context3.next = 20;
                    break;

                  case 19:
                    res.status(404).json({
                      status: 'error'
                    });

                  case 20:
                  case "end":
                    return _context3.stop();
                }
              }
            }, null, null, [[7, 14]]);
          }));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.RenderDeleteUser = function _callee5(req, res) {
  var email;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          email = req.body.email;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.deleteOne({
            email: email
          }).then(function (user, status) {
            res.status(200).json({
              status: user
            });
          }));

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.RenderConfimPassword = function _callee7(req, res) {
  var _req$body3, pwd, email;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body3 = req.body, pwd = _req$body3.pwd, email = _req$body3.email;

          if (!(pwd === undefined)) {
            _context7.next = 5;
            break;
          }

          res.status(404).json({
            status: "error",
            message: "invalid secret key"
          });
          _context7.next = 7;
          break;

        case 5:
          _context7.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).then(function (user) {
            if (!user) {
              res.status(400).json({
                status: "error",
                massage: "err"
              });
            } else {
              bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(pwd, salt, function (err, hash) {
                  if (err) console.log(err);
                  User.updateOne({
                    pwd: 'kristik'
                  }, {
                    pwd: hash
                  }, function _callee6(err, result) {
                    return regeneratorRuntime.async(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            user.pwd = hash;
                            _context6.next = 3;
                            return regeneratorRuntime.awrap(user.save());

                          case 3:
                            res.status(200).json({
                              status: "Ok",
                              message: 'password complite'
                            });

                          case 4:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    });
                  });
                });
              });
            }
          }));

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.RenderChangePassword = function _callee9(req, res) {
  var _req$body4, email, pwd;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _req$body4 = req.body, email = _req$body4.email, pwd = _req$body4.pwd;

          if (!(email === undefined && pwd === undefined)) {
            _context9.next = 5;
            break;
          }

          res.status(404).json({
            status: "error",
            message: "invalid secret key"
          });
          _context9.next = 7;
          break;

        case 5:
          _context9.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).then(function (user) {
            if (!user) {
              res.status(400).json({
                status: "error",
                massage: "Email not found"
              });
            } else {
              bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(pwd, salt, function (err, hash) {
                  if (err) console.log(err);
                  User.updateOne({
                    pwd: 'kristik'
                  }, {
                    pwd: hash
                  }, function _callee8(err, result) {
                    return regeneratorRuntime.async(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            user.pwd = hash;
                            _context8.next = 3;
                            return regeneratorRuntime.awrap(user.save());

                          case 3:
                            res.status(200).json({
                              status: "Ok",
                              message: 'password complite'
                            });

                          case 4:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    });
                  });
                });
              });
            }
          }));

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var convertHTMLToPDF = require("pdf-puppeteer");

exports.getPdf = function _callee11(req, res) {
  var options, file;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          options = {
            format: 'A3'
          };
          file = {
            content: req.body.html
          };
          convertHTMLToPDF(req.body.html, function _callee10(pdf) {
            return regeneratorRuntime.async(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    res.status(200).json({
                      status: pdf
                    });

                  case 1:
                  case "end":
                    return _context10.stop();
                }
              }
            });
          });

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
};

exports.RenderRegistration = function _callee13(req, res) {
  var _req$body5, email, name, surname, faculty, Unic, Napr;

  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _req$body5 = req.body, email = _req$body5.email, name = _req$body5.name, surname = _req$body5.surname, faculty = _req$body5.faculty, Unic = _req$body5.Unic, Napr = _req$body5.Napr;

          if (!(name === undefined)) {
            _context13.next = 5;
            break;
          }

          res.status(404).json({
            status: "error",
            message: 'Incorrect user data'
          });
          _context13.next = 7;
          break;

        case 5:
          _context13.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).then(function _callee12(user) {
            var newUser, token;
            return regeneratorRuntime.async(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    if (!user) {
                      _context12.next = 5;
                      break;
                    }

                    console.log(user);
                    res.status(404).json({
                      status: "error",
                      message: 'Email alredy exits'
                    });
                    _context12.next = 11;
                    break;

                  case 5:
                    newUser = new User({
                      email: email,
                      name: name,
                      surname: surname,
                      faculty: faculty,
                      Unic: Unic,
                      Napr: Napr
                    });
                    newUser.pwd = 'kristik';
                    token = genToken(newUser);
                    _context12.next = 10;
                    return regeneratorRuntime.awrap(newUser.save());

                  case 10:
                    res.status(200).json({
                      status: "ok",
                      message: 'null',
                      token: token
                    });

                  case 11:
                  case "end":
                    return _context12.stop();
                }
              }
            });
          }));

        case 7:
        case "end":
          return _context13.stop();
      }
    }
  });
};

exports.RenderUserInformation = function _callee14(req, res) {
  var auth, decoded;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          if (!(req.headers && req.headers.authorization)) {
            _context14.next = 7;
            break;
          }

          auth = req.headers.authorization.split(' ')[1];
          decoded = jwt.verify(auth, 'kristik');
          _context14.next = 5;
          return regeneratorRuntime.awrap(User.findById({
            _id: decoded.sub
          }).then(function (user) {
            var userData = {
              name: user.name,
              middleName: user.middleName,
              surname: user.surname,
              phone: user.phone,
              email: user.email
            };
            res.status(200).json({
              status: "ok",
              message: userData
            });
          }));

        case 5:
          _context14.next = 8;
          break;

        case 7:
          res.status(500).json({
            status: 'error',
            message: "unauth"
          });

        case 8:
        case "end":
          return _context14.stop();
      }
    }
  });
};

exports.RenderAuth = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: 'Incorrect username/password'
      });
    }

    req.logIn(user, function (err) {
      if (err) next(err);
      var token = genToken(user);
      return res.status(200).json({
        status: "success",
        message: 'ok',
        token: token,
        id: user._id
      });
    });
  })(req, res, next);
};