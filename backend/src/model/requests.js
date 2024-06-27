const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adoptionSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String
    },
    laptop_id: {
        type: String,
        required: true,
    },
    laptop_name: {
        type: String
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

const Adoption = mongoose.model('requests', adoptionSchema);

module.exports = Adoption;