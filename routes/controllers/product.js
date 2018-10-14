
const Model = require('../../model');
const {Product, Item} = Model; //import constructor ?
 //const HOST_IMG = 'http://35.198.207.238:3000/images/products/';
 const IMAGE_FOLDER = '/images/products/';
let getProductFromRequestBody = function(requestBody){
    var fileName = req.file.filename;
    var productString = requestBody.product;
    var product = JSON.parse(productString);
    product.image = IMAGE_FOLDER + fileName;
    console.debug(product);
    return product;
};

const ProductController = {
    all(req, res) {
        Product.find({}).exec((error, products) => res.json(products));
    },
    byId(req, res) {
        const idParam = req.params.id;
        Product.findOne({_id: idParam})
            .exec((err, product) => res.json(product));
    },
    create(req, res, next) {
        const requestBody = req.body;

        var fileName = req.file.filename;
        var productString = requestBody.product;
        var product = JSON.parse(productString);
        product.image = IMAGE_FOLDER + fileName;
        console.debug(product);

        const newProduct = new Product(product);
        newProduct.save((err, saved) => {
            Product.findOne({_id: saved._id}).exec((err, product) => res.json(product));
        });
    },

    update(req, res) {
        const requestBody = req.body;
        const idParam = req.params.id;
        console.debug('updating product id: ' + idParam);
        var fileName = req.file.filename;
        var productString = requestBody.product;
        var updatedProduct = JSON.parse(productString);
        updatedProduct.image = IMAGE_FOLDER + fileName;
        console.debug(updatedProduct);
        console.debug(updatedProduct.image);
        Product.findOne({_id: idParam}, (error, data) => {
            data.name = updatedProduct.name;
            data.description = updatedProduct.description;
            data.image = updatedProduct.image;
            data.price = updatedProduct.price;

            data.save((error, updatedProduct) => {
                res.json(updatedProduct);
            });
        })
    },
    remove(req, res) {
        const idParam = req.params.id;
        Product.findOne({_id: idParam}).remove((error, removedProduct) => res.json(removedProduct));
    }
};


module.exports = ProductController;