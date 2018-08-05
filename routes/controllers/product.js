const Model = require('../../model');
const {Product} = Model; //import constructor ?

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

    create(req, res) {
        const requestBody = req.body;
        const newProduct = new Product(requestBody);
        newProduct.save( (err, saved) => {
            Product.findOne({_id: saved._id}).exec((err, product) => res.json(product));
        });
    },

    update(req, res) {
        const idParam = req.params.id;
        const updatedProduct = req.body;

        console.debug(idParam);
        console.debug(updatedProduct);
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