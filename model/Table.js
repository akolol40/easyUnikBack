const moogoose = require('mongoose')
const { Schema } = moogoose
const usersDB = require('../mongo/usDb')

const Table = new Schema({
        title: {
            type: String, 
            required: true
        }, 
        header: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    
},{versionKey: false})


module.exports = usersDB.model('Table', Table)