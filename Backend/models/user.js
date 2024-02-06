const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: 'Invalid email address',
        },
    },
    password:{
        type:String,
        required:true,
        validate: {
            validator: (v) => validator.isStrongPassword(v),
            message: 'Password is not strong',
        },
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = {User}