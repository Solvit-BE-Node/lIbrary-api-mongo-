const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required: true
    }
});


module.exports = mongoose.model('Review', ReviewSchema)