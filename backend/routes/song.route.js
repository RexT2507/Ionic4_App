const express = require('express');
const app = express();
const songRoute = express.Router();

let SongModel = require('../model/Song');

// Route d'ajout de musique
songRoute.route('/create-song').post((req, res, next) => {
    SongModel.create(req.body, (error, data) => {
        if(error)
        {
            return next(error);
        }
        else
        {
            res.json(data);
        }
    });
});

// Route pour afficher toutes les musiques
songRoute.route('/').get((req, res) => {
    SongModel.find((error, data) => {
        if(error)
        {
            return next(error);
        }
        else
        {
            res.json(data);
        }
    });
});

// Route pour afficher une musique via son id
songRoute.route('/get-song/:id').get((req, res) => {
    SongModel.findById(req.params.id, (error, data) => {
        if(error)
        {
            return next(error);
        }
        else
        {
            res.json(data);
        }
    });
});

// Route pour mettre à jour une musique via son id
songRoute.route('/update-song/:id').put((req, res, next) => {
    SongModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error)
        {
            return next(error);
            console.log(error);
        }
        else
        {
            res.json(data);
            console.log('Song successfully updated!');
        }
    });
});

// Route pour supprimer une musique via son id
songRoute.route('/delete-song/:id').delete((req, res, next) => {
    SongModel.findByIdAndRemove(req.params.id, (error, data) => {
        if(error)
        {
            return next(error);
        }
        else
        {
            res.status(200).json({
                msg: data
            });
        }
    });
});

module.exports = songRoute;