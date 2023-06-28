const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const Login = new Schema({
    email: { 
        type: String, 
        default: '', 
        unique: true, 
        lowercase: true, 
        required: [true, 'Please enter your email'],
        validate:[isEmail,'Please enter a valid email']
    },

    password: { 
        type: String, 
        default: '', 
        required: [true, 'Please enter your password'], 
        minLength: [6, 'Minimum password length is 6 characters'],
    }, 

    loginAt: { type: Date, default: Date.now},
    logoutAt: { type: Date, default: Date.now},
    action: { type: String, default: 'System'},
    
}, { collection: 'Login' })




//fire a function before doc saved to db
Login.pre('save',async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//static method to login user
Login.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } throw Error('Incorrect email');
    } 
    throw Error('Incorrect password');
};


// Login.index({ first: 1, last: -1 }) Nơi đánh index
module.exports = mongoose.model('Login', Login)