const jwt = require('jsonwebtoken');
const Login = require('../models/Login');
const  requireAuth = (req, res, next)  =>{
    const token = req.cookies.jwt;

    // Check if JSON Web Token exists and is verified
    if (token) {
        jwt.verify(token, 'kisnxc secret', (err, decodedToken) => {
            if (err) {
                res.redirect('/auth/login');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/auth/login');
    }
};

// Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'kisnxc secret', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await Login.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = {requireAuth, checkUser}

