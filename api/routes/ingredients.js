const express = require('express');
const router = express.Router();


// Handle incoming GET request to /ingredients
router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Get Ingredient Request'
    })
});

router.post('/', (req, res, next) => {
    const ingredient = {
        recipeId: req.body.recipeId,
        name: req.body.name,
        quantity:req.body.quantity 
    }
    res.status(201).json({
        message : 'Post Ingredient Request',
        ingredient: ingredient
    })
});

router.get('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;
    if(id == 'special'){
        res.status(200).json({
            message : 'You discover the special id',
            id : id
        })
    }else{
        res.status(200).json({
            message : 'You pass an id'
        })
    }
});

router.patch('/:ingredientId', (req, res, next) => {
    res.status(200).json({
        message : 'Update ingredient'
    })
});

router.delete('/:ingredientId', (req, res, next) => {
    res.status(200).json({
        message : 'Delete ingredient'
    })
});

module.exports = router;
