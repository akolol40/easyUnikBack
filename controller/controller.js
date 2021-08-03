const bcrypt = require('bcryptjs')
const User = require('../model/User')
const Table = require('../model/Table')
const jwt = require('jsonwebtoken')
const nodeemail = require('nodemailer')

const passport = require('passport')
const { set } = require('mongoose')



const Mongoose = require('../mongo/usDb')
const { Schema } = Mongoose

genToken = user => {
    return jwt.sign({
        iss: 'Mihael_kharadjidi',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
        email: user.email
    }, 'kristik') 
}

exports.RenderlistPost = async(req, res) => {
    await Table.aggregate([
        {
          $group: {
            "_id": '$_id',
            title: {'$first': "$title"},
            header: {'$first': "$header"},
            text: {'$first': "$text"}
          }
        }
      ]).exec((err, result) => {
        res.status(200).json(result)
      })
}

exports.RenderCreateTable = async(req, res) => {
  const {title, header, text} = req.body 

  const table = new Table({
      title: title,
      header: header,
      text: text
  })

  await table.save()

  res.status(200).json({status: 'table_create'})
}

exports.RenderSendCode = async(req, res) => {
    const {email, code} = req.body
    let number = 0;
    console.log(email)
    number = parseInt(code) 
    await User.findOne({email: email}).then(async(user) => {
        if (user) {
            res.status(400).json({status: "error", massage: "reg"})
          } else {
            if (!isNaN(number)) {
                console.log(user)
                let transporter = nodeemail.createTransport({
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
                })
                
                try {
                    let result =  await transporter.sendMail({
                        from: '"Код подтверждения" <admin@thewicker.ru>',
                        to: email,
                        subject: "admin@thewicker.ru",
                        text: number.toString(),
                    });
        
                    res.status(200).json({status: 'ok', message: number})
                } catch(e) {
                    return console.log(e.name , e.message)
                }
        
            } else 
            res.status(404).json({status: 'error'}) 
          }  
    })
    
}

exports.RenderDeleteUser = async(req, res) => {
    const {email} = req.body 
    await User.deleteOne({email: email}).then((user, status) => {
        res.status(200).json({status: user})
    })
}

exports.RenderConfimPassword = async(req, res) => {
    const {pwd, email} = req.body
    if (pwd === undefined) {
        res.status(404).json({status: "error", message: "invalid secret key"})
    } else 
    {
       await User.findOne({email: email}).then(user => {
       if (!user) {
         res.status(400).json({status: "error", massage: "err"})
       } else 
       {
          bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pwd , salt, (err, hash) => {
                    if (err) console.log(err);
                    User.updateOne({pwd: 'kristik'}, {pwd: hash} , async (err, result) => {
                        user.pwd = hash;
                        await user.save()
                        res.status(200).json({status:"Ok" , message: 'password complite'})
                    })
                })
           })            
       }    
       }) 
    }    
}

exports.RenderChangePassword = async(req,res) => {
    const {email, pwd} = req.body
    if (email === undefined && pwd === undefined) {
        res.status(404).json({status: "error", message: "invalid secret key"})
    } else 
    {
       await User.findOne({email: email}).then(user => {
       if (!user) {
         res.status(400).json({status: "error", massage: "Email not found"})
       } else 
       {
          bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pwd , salt, (err, hash) => {
                    if (err) console.log(err);
                    User.updateOne({pwd: 'kristik'}, {pwd: hash} , async (err, result) => {
                        user.pwd = hash;
                        await user.save()
                        res.status(200).json({status:"Ok" , message: 'password complite'})
                    })
                })
           })            
       }    
       }) 
    } 
}


const convertHTMLToPDF = require("pdf-puppeteer");
exports.getPdf = async(req, res) => {
   
    let options = { format: 'A3' };
    let file = { content: req.body.html};
    convertHTMLToPDF(req.body.html, (async(pdf
    ) => {
 
           res.status(200).json({status:pdf})
    }))
    
}

exports.RenderRegistration = async(req,res) => {
    const {email, name , surname, faculty, Unic, Napr} = req.body
    if (name === undefined   )
    {
        res.status(404).json({status:"error" , message: 'Incorrect user data'})
    } else 
    {
        await User.findOne({email: email}).then(async user => {
            if (user) {
                console.log(user)
                res.status(404).json({status:"error" , message: 'Email alredy exits'})
            } else 
            {
                const newUser = new User({
                    email, 
                    name, 
                    surname,
                    faculty,
                    Unic,
                    Napr
                })
                newUser.pwd = 'kristik';
        
                const token = genToken(newUser)
                await newUser.save()
                
                res.status(200).json({status:"ok" , message: 'null', token: token})
              
  

                

            }
        })
    }
}

exports.RenderUserInformation = async(req,res) => {
    if (req.headers && req.headers.authorization) {
        const auth = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(auth, 'kristik')

        await User.findById({_id: decoded.sub}).then(user => {
            const userData = {
                name: user.name, 
                middleName: user.middleName, 
                surname: user.surname, 
                phone: user.phone,
                email: user.email
            }
            res.status(200).json({status: "ok", message: userData})
        })
    } else 
        res.status(500).json({status: 'error', message: "unauth"})  
}

exports.RenderAuth = (req, res, next) => {
    passport.authenticate('local', (err,user , info) => {
        if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(404).json({status:"error" , message: 'Incorrect username/password'})
          }
          req.logIn(user, (err) => {
              if (err) next(err)
              const token = genToken(user)
              return res.status(200).json({status:"success" , message: 'ok', token: token, id: user._id})          
          }) 
    })(req, res, next)   
}