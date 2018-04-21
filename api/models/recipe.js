const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quantity: {
        type: Number,
        default: 1
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);