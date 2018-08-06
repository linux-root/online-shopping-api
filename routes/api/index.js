var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({storage: storage});

var productController = require('../controllers/product');
router.get('/products', productController.all);
router.get('/products/:id', productController.byId);
router.post('/products', upload.single('image'), productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);
module.exports = router;
