const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Ingredient = require('../models/ingredient');

router.get('/', (req, res, next) => {
    Ingredient.find()
        .select('name _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                ingredient: docs.map(doc => {
                    return {
                        name: doc.name,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/ingredients/' + doc._id
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
    const ingredient = new Ingredient({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    ingredient
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message : 'Create ingredient successfully',
                createdIngredient: {
                    name: result.name,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/ingredients/" + result._id
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

router.get('/:ingredientId', (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.findById(id)
        .select('name  _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc) {
                res.status(200).json({
                    recipe: doc,
                    request: {
                        type: 'GET',
                        url: 'http://loclahost:3000/ingredients'
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

router.patch('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Ingredient.update({ _id: id }, { $set: updateOps})
        .select('name _id')
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Ingredient updated",
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/ingredients/' + id
                    }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
});

router.delete('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;
    Ingredient.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Delete reciped',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/ingredients/',
                    data: { name: 'String'}
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