const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Get Ingredient Request'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message : 'Post Ingredient Request'
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
