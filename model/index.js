const mongoose = require('mongoose');

const Schema = mongoose.Schema,
      model = mongoose.model.bind(mongoose),
      ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = Schema({
    id: ObjectId,
    name: String,
    price: Number,
    image: String,
    description: String
});


const Product = model('Product', ProductSchema);

module.exports = {Product};
