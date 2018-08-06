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

const Item = new Schema(
    {
        img: {data: Buffer, contentType: String}
    }
);


const Product = model('Product', ProductSchema);

module.exports = {Product, Item};
