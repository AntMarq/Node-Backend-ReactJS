const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');


// Handle incoming GET request to /recipes
router.get('/', (req, res, next) => {
    Recipe.find()
        .select('ingredient quantity _id')
        .populate('ingredient', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                recipes: docs.map(doc => {
                    return {
                        _id: doc._id,
                        ingredient: doc.ingredient,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/recipes/' + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    Ingredient.findById(req.body.ingredientId)
        .then(ingredient => {
            if(!ingredient){
                return res.status(404).json({
                    message: 'Ingredient not found'
                });
            }
            const recipe = new Recipe({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                quantity: req.body.quantity,
                ingredient: req.body.ingredientId
        
            });
            return recipe.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Recipe stored',
                createdRecipe: {
                    ingredient: result.ingredient,
                    _id: result._id,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/recipes/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:recipeId', (req, res, next) => {
    Recipe.findById(req.params.recipeId)
    .populate('ingredient')
    .exec()
    .then(recipe => {
        if(!recipe){
            return res.status(404).json({
                message: 'Recipe not found'
            });
        }
        res.status(200).json({
            recipe: recipe,
            request: {
                type: 'GET',
                url: "http://localhost:3000/recipes/"
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

router.delete('/:recipeId', (req, res, next) => {
    Recipe.remove({
        _id: req.params.recipeId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Recipe deleted',
            request: {
                type: 'POST',
                url: "http://localhost:3000/recipes/",
                body: {recipeId: 'ID', quantity: 'Number'}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;
