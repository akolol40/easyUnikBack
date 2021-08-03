const moogoose = require('mongoose')
const { Schema } = moogoose
const usersDB = require('../mongo/usDb')

const User = new Schema({
        email: {
            type: String, 
        }, 
        pwd: {
            type: String,
            default: 'kristik'
        },
        name: {
            type: String,
        },
        surname: {
            type: String
        },
        faculty: {
            type: String
        },
        Unic: {
            type: String
        },
        Napr: {
            type: String
        }
    
},{versionKey: false})


module.exports = usersDB.model('User', User)