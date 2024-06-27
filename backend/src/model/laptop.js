const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const laptopSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    storage: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    processor: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }

});

const Laptop = mongoose.model('laptop', laptopSchema);

module.exports = Laptop;