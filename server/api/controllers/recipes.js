const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const mongoose = require('mongoose');

exports.recipes_get_all = (req, res, next) => {
    Recipe.find()
        .select('ingredient quantity _id recipeImage')
        .populate('ingredient', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                recipes: docs.map(doc => {
                    return {
                        _id: doc._id,
                        ingredient: doc.ingredient,
                        recipeImage: doc.recipeImage,
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
}


exports.recipes_create_recipe = (req, res, next) => {
    console.log(req.file);
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
                ingredient: req.body.ingredientId,
                recipeImage: req.file.path
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
}

exports.recipes_get_recipe = (req, res, next) => {
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
}

exports.recipes_delete = (req, res, next) => {
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
}