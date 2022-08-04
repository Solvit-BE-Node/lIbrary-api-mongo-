const Book = require('../models/books')
const {NotFound, BadRequest} = require('http-errors')
const asyncHandler = require('../middlewares/async')
const reviews = require('../models/reviews')

const createBook = asyncHandler(async (req, res, next) => {
    const book = new Book(req.body)
    const newBook = await book.save()
    res.status(201).json({
        success:true, 
        data: newBook
    })
})

async function getAllBooks(req, res, next) {
    try{
        const books = await Book.find()
        if (!books){
            throw new NotFound('no book with id found')
        }
        res.status(200).json({
            success: true, 
            data: books
        })
    }catch(e){
        next(e)
    }

}

async function getOneBook (req, res, next) {
    try{
        if(!req.params.id) {
            throw new BadRequest('no id provided')
        }
        const book = await Book.findById(req.params.id)
        if (!book){
            throw new NotFound('no book with id found')
        }
        const bookReviews = await reviews.find({book:book._id}).populate('user')
        res.status(200).json({
            success: true, 
            data:{
                book: book,
                reviews: bookReviews
            }
        })
    }catch(e){
        next(e)
    }
}

async function updateBook(req, res, next) {
    try{
        if(!req.params.id) {
            throw new BadRequest('id must be provided!')
        }
       let book = await Book.findById(req.params.id)
       if(!book) {
        throw new NotFound('no book with id exist')
       }
       book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true
       })
       res.status(200).json({
           success:true,
           data: book
       })

    }catch(e){
        next(e)
    }
}

async function deleteBook(req, res, next) {
    try{
    if(!req.params.id) throw new BadRequest('No id provided')
    const deletedBook = await Book.findByIdAndDelete(req.params.id)
    if(!deleteBook) throw new NotFound('No such Book was found')
    const deletedBookReviews = await reviews.deleteMany({book:req.params.id})
       res.status(200).json({
           success:true,
           data: {
            deletedBook: deletedBook,
            deletedReviews: deletedBookReviews
           }
       })

    }catch(e){
        next(e)
    }
}




module.exports = {
    createBook,
    getAllBooks,
    getOneBook,
    updateBook,
    deleteBook
}