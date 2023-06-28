const { response } = require('express');
const Login = require('../models/Login');
const { multipleMongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');


//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    //incorrec email 
    if (err.message === 'Incorrect email') {
        errors.password = 'Email or password incorrect';
    }

    //incorrec password 
    if (err.message === 'Incorrect password') {
        errors.password = 'Email or password incorrect';
    }

    //validation errores
    if (err.message.includes('Login validation failed')) {
        Object.values(err.errors).forEach(properties => {
            errors[properties.path] = properties.message;
        });
    }
    //duplicate errors
    if (err.code === 11000) {
        errors.email = 'That email is already registered'
    }

    return errors;
}

const maxAge = 3*24*60*60;
const createToken = (id) => {
    return jwt.sign({id}, 'kisnxc secret', {
        expiresIn: maxAge
    });
}

class LoginController {
    login_get(req, res) {
        res.render('./auth/login');
    }

    signup_get(req, res) {
        res.render('./auth/signup');
    }


    //signup
    async signup_post(req, res) {
        const { email, password } = req.body;
        try {
            const user = await Login.create({ email: email, password: password });
            const token = createToken(user._id);
            res.cookie('jwt',token, {httpOnly: true, maxAge});
            res.status(201).json({user: user._id});
        } catch (error) {
            const errors = handleErrors(error);
            res.status(400).json({ errors });
        }
    }


    //login
    async login_post(req, res) {
        const { email, password } = req.body;
        try{
            const user = await Login.login(email, password); 
            const token = createToken(user._id);
            res.cookie('jwt',token, {httpOnly: true, maxAge});
            res.status(200).json({ user: user._id});
        } catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }

    }


    logout_get(req, res) {
        res.cookie('jwt','',{maxAge:1});
        res.redirect('/');
    }

}

module.exports = new LoginController();
