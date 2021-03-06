const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    ingredientImage: { type: String, required: true}
});

module.exports = mongoose.model('Ingredient', ingredientSchema);