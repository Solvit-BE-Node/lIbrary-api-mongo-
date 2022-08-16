const { optional } = require("joi");
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    text : {
     type: String,
     required: optional()
    },
    date : {type : Date, default : Date.now()},
});


module.exports = mongoose.model('Review', ReviewSchema)