const { response } = require('express');
const Idol = require('../models/Idol');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // Get /idols/slug




    storedIdols(req, res, next) {
        let idolQuery = Idol.find({});

        
        if (req.query.hasOwnProperty('_sort')) {
            idolQuery = idolQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([idolQuery, Idol.countDocumentsDeleted()])
            .then(([idols, deletedCount]) =>               
                res.render('me/stored-idols', {
                    deletedCount,
                    idols: multipleMongooseToObject(idols)
                })
            )
            .catch(next);
    }

    // Get /me/trash/idols
    trashIdols(req, res, next) {

        Promise.all([Idol.findDeleted({}), Idol.countDocuments()])
        .then(([idols, listCount]) =>               
            res.render('me/trash-idols', {
                listCount,
                idols: multipleMongooseToObject(idols)
            })

        )
        .catch(next);   
    }



}

module.exports = new MeController();
