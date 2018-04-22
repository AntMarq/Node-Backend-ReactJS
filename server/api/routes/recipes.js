const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth')
const RecipesController = require ('../controllers/recipes');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/recipes/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }
});

const fileFilter = function(req, file, cb){
    if(file.mimetype === 'image/jpeg' || ile.mimetype === 'image/png'){
        cb(null, true);
    }
    cb(null, false);
}

const upload = multer({storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 1   
    },
    fileFilter: fileFilter
});

// Handle incoming GET request to /recipes
router.get('/', checkAuth, RecipesController.recipes_get_all);

router.post('/', checkAuth,upload.single('recipeImage'), RecipesController.recipes_create_recipe);

router.get('/:recipeId', checkAuth, RecipesController.recipes_get_recipe);

router.delete('/:recipeId', checkAuth, RecipesController.recipes_delete);

module.exports = router;
