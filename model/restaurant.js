const mongoose = require('mongoose');

const restrSchema = mongoose.Schema({
    name: {
        type: String,

    },
    descriptions: {
        type: String,

    },
    address: {
        type: String,

    },
    Contact_No: {
        type: Number,

    },
    image: {
        type: String,

    }
})
const Restaurant = mongoose.model("Restaurant", restrSchema);
module.exports = Restaurant;