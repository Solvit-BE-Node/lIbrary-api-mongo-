const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    book: {
        type: String,
        required: true,
        default: "all books"
    },
    text: {
        type: Array,
        required: true
    }
});


module.exports = mongoose.model('Review', ReviewSchema)