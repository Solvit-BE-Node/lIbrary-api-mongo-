const Book = require('../models/books');
const {NotFound, BadRequest} = require('http-errors');
const asyncHandler = require('../middlewares/async');

const createBook = asyncHandler(async (req, res ) => {
    const book = new Book(req.body);
    const newBook = await book.save();
    res.status(201).json({
        success:true, 
        data: newBook
    });
});

const getBooks = asyncHandler(async (req, res) => {
    const book = await Book.find({});
    res.status(200).json({
        success:true,
        data: book,
        count: book.length
    });

});

const getOneBook = asyncHandler(async (req, res) =>  {
    if(!req.params.id) {
        throw new BadRequest('no id provided');
    }
    await Book.findOne({_id:req.params.id});
    const book = await Book.findById(req.params.id);
    if (!book){
        throw new NotFound('no book with id found');
    }
    res.status(200).json({
        success: true, 
        data: book
    });
});

const updateBook = asyncHandler(async (req, res) => {
    if(!req.params.id) {
        throw new BadRequest('id must be provided!');
    }
    const existingBook = await Book.findById(req.params.id);
    if(!existingBook) {
        throw new NotFound('no book with id exist');
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.status(200).json({
        success:true,
        data: book
    });

});

const deleteBook = asyncHandler(async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        data: {}
    });
});




module.exports = {
    createBook,
    getBooks,
    getOneBook,
    updateBook,
    deleteBook
};
