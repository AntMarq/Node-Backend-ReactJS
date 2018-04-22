const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth')
const IngredientsController = require ('../controllers/ingredients');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/ingredients/');
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
        fileSize: 1024 * 1024 * 0.05
    },
    fileFilter: fileFilter
});

router.get('/', checkAuth, IngredientsController.ingredients_get_all);

router.post('/', checkAuth, upload.single('ingredientImage'), IngredientsController.inredients_create_ingredient);

router.get('/:ingredientId', checkAuth, IngredientsController.ingredients_get_ingredient);

router.patch('/:ingredientId', checkAuth, IngredientsController.inredients_update_ingredient);

router.delete('/:ingredientId', checkAuth, IngredientsController.ingredients_delete);

module.exports = router;