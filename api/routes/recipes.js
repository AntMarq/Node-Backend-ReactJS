const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require('../models/recipe');

router.get('/', (req, res, next) => {
    Recipe.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if(docs.length >= 0){
                res.status(200).json(docs);
            }
            else{
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.post('/', (req, res, next) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        duration: req.body.duration
    })
    recipe
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message : 'Handling Post request to /recipes',
                createdIngredient: result
            })
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            } 
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err});
        });
});

router.patch('/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Recipe.update({ _id: id }, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
});

router.delete('/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

module.exports = router;