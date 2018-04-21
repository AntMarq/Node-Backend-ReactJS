const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require('../models/recipe');

router.get('/', (req, res, next) => {
    Recipe.find()
        .select('name duration _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                recipes: docs.map(doc => {
                    return {
                        name: doc.name,
                        duration: doc.duration,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/recipes/' + doc._id
                        }
                    }
                })
            };
           // if(docs.length >= 0){
                res.status(200).json(response);
            //}
            // else{
            //     res.status(404).json({
            //         message: "No entries found"
            //     })
            // }
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
                message : 'Create recipe successfully',
                createdRecipe: {
                    name: result.name,
                    duration: result.duration,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/recipes/" + result._id
                    }

                }
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
        .select('name duration _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc) {
                res.status(200).json({
                    recipe: doc,
                    request: {
                        type: 'GET',
                        url: 'http://loclahost:3000/recipes'
                    }
                });
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
        .select('name duration _id')
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Recipe updated",
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/recipes/' + id
                    }
            });
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
            res.status(200).json({
                message: 'Delete reciped',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/recipes/',
                    data: { name: 'String', duration: 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

module.exports = router;