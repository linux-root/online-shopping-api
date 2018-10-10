
const Model = require('../../model');
const {Product, Item} = Model; //import constructor ?
 //const HOST_IMG = 'http://35.198.207.238:3000/images/products/';
 const HOST_IMG = 'http://localhost:3000/images/products/';

 var getProductFromRequestBody = function (requestBody){
    var fileName = req.file.filename;
    var productString = requestBody.product;
    var product = JSON.parse(productString);
    product.image = HOST_IMG + fileName;
    console.debug(product);
    return product;
}

const ProductController = {
    all(req, res) {
        Product.find({}).exec((error, products) => res.json(products));
    }
    ,
    byId(req, res) {
        const idParam = req.params.id;
        Product.findOne({_id: idParam})
            .exec( (err, product) => res.json(product) );
    },

    create(req, res, next) {
        const requestBody = req.body;
        const newProduct = new Product(getProductFromRequestBody(requestBody));
        newProduct.save( (err, saved) => {
            Product.findOne({_id: saved._id}).exec((err, product) => res.json(product));
        });
    },

    update(req, res) {
        const idParam = req.params.id;
        console.debug('updating product id: ' + idParam);
        var updatedProduct = getProductFromRequestBody(req.body);
        console.debug(updatedProduct.image)
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