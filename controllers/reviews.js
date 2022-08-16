
const Book = require('../models/books')
const Review = require('../models/reviews')
const {NotFound, BadRequest} = require('http-errors')
const asyncHandler = require('../middlewares/async')


const createBookReview =asyncHandler( async(req, res, next) => {
        const book_id = req.params.book_id;
        const book = await Book.findById(book_id);

        const review = new Review({
            text: review_text,
        });
        await review.save();        
        book.reviews.push(review._id);
        await book.save();

})

const UpdateBookReview = asyncHandler( async(req, res, next) => {
    const review_id = req.params.review_id;
    const review_text = req.body.review;
    const book_id = req.params.book_id;

    try {
        await Review.findByIdAndUpdate(review_id, review_text);

        const book = await Book.findById(book_id);
        
    } catch(err) {
        console.log(err);

    }

})

 const deleteBookReview = asyncHandler( async(req, res, next) => {
    const book_id = req.params.book_id;
    const review_id = req.params.review_id;

    try {
        // fetching the book
        const book = await Book.findById(book_id);

        // finding the position and popping comment_id
        const pos = book.reviews.indexOf(reviews_id);
        book.reviews.splice(pos, 1);
        await book.save();

        // removing comment from Comment
        await Review.findByIdAndRemove(reviews_id);

    } catch(err) {
        console.log(err);
    }
})

module.exports = {
    createBookReview,
    UpdateBookReview,
    deleteBookReview
}