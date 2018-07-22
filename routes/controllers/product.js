const Model = require('../../model');
const {Product} = Model;

const ProductController = {
    all(req, res) {
        Product.find({}).exec((error, product) => res.json(product));
    }
    ,

    byId(req, res) {
        const idParam = req.params.id;
        // Returns a single product
        // based on the passed in ID parameter
        Product.findOne({_id: idParam})
            .exec( (err, product) => res.json(product) );
    },

    create(req, res) {
        const requestBody = req.body;
        // Creates a new record from a submitted form
        console.log(requestBody);
        const newProduct = new Product(requestBody);
        // and saves the record to
        // the data base
        newProduct.save( (err, saved) => {
            // Returns the saved product/*   const newProduct = new Product(requestBody);
        // and saves the record to
        // the data base
        newProduct.save( (err, saved) => {
            // Returns the saved product
            // after a successful save
            Product
                .findOne({_id: saved._id})
                .exec((err, product) => res.json(product));
        } );
            // after a successful save
            Product
                .findOne({_id: saved._id})
                .exec((err, product) => res.json(product));
        } );
    },

    update() {

    },
    remove(id) {
    }
}

module.exports = ProductController;