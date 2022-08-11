const Book = require('../models/books')
const Review = require('../models/reviews');
const {NotFound, BadRequest} = require('http-errors')
const asyncHandler = require('../middlewares/async')


const addBookReview = asyncHandler(async (req, res, next) => {
    // id from body is the review id, 
    const {id,name, text} = req.body;
    if(!id) {
        const review = await Review.create({book: name,text});
        console.log(review._id);
        const book = await Book.findOneAndUpdate({_id:req.params.id}, {reviews: review._id}, {new: true})
        res.status(201).json({status: "review created...", review,book});
    }else {
        await Review.findOne({_id:id}).then(async d=> {
            
            d.text.push(text);
            console.log(d);
            const review = await Review.findByIdAndUpdate({_id:id},{book: d.book, text: d.text},{new: true});
            res.status(200).json({status: "review created", review});
        });
    }
})

module.exports = {
    addBookReview
}