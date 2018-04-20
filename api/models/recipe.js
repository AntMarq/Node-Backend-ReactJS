const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    duration: Number
});

module.exports = mongoose.model('Recipe', recipeSchema);