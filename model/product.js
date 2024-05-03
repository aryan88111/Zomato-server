const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,

    },
    price: {
        type: Number,

    },
    descriptions: {
        type: String,

    },
    image: {
        type: String,

    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})
const Product = mongoose.model("Product", productSchema);
module.exports = Product;