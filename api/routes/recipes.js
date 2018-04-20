const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Get Recipes Request'
    })
});

router.post('/', (req, res, next) => {
    const ingredient = {
        name: req.body.name,
        duration:req.body.duration 
    }
    res.status(201).json({
        message : 'Post Recipes Request',
        ingredient: ingredient
    })
});

router.get('/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;
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

router.patch('/:recipeId', (req, res, next) => {
    res.status(200).json({
        message : 'Update recipe'
    })
});

router.delete('/:recipeId', (req, res, next) => {
    res.status(200).json({
        message : 'Delete recipe'
    })
});

module.exports = router;