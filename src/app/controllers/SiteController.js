const { response } = require('express');
const Idol = require('../models/Idol');
const {multipleMongooseToObject} = require('../../util/mongoose');

class SiteController {
    // Get /
    index(req, res, next) {

        Idol.find({})
            .then((idols) => {   
                res.render('home', {
                    idols:multipleMongooseToObject(idols)
                });
            }) 
            .catch(next) ;
            
        // res.render('home');
    }

    // Get /search
    search(req, res) {
        res.render('search');
    }

    

}

module.exports = new SiteController();
