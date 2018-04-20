const express = require('express');
const app = express();

const recipesRoutes = require('./api/routes/recipes');
const ingredientsRoutes = require('./api/routes/ingredients');


app.use('/recipes', recipesRoutes);
app.use('/ingredients', ingredientsRoutes);


module.exports = app;