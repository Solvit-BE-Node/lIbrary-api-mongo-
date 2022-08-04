const asyncHandler = require("../middlewares/async");
const {BadRequest} = require('http-errors')

const reviews = require("../models/reviews");

const createReview = asyncHandler( async(req,res)=>{
    const review = new reviews(req.body)
    const newReview = await review.save()
    await newReview.populate('user')
    await newReview.populate('book')
    res.json({Review:newReview})
})

const getReviews = asyncHandler( async(req,res)=>{
    const allReviews = await reviews.find().populate('user').populate('book')
    res.json({Reviews: allReviews})
})

const getReview = asyncHandler( async(req,res)=>{
    if(!req.params.id) throw BadRequest('No id provided')
    const review = await reviews.findById(req.params.id).populate('user').populate('book')
    res.json({Review: review})
})

const editReview = asyncHandler( async(req,res)=>{
    if(!req.params.id) throw BadRequest('No id provided')
    const editedReview = await reviews.findByIdAndUpdate(req.params.id,{text:req.body.text})
    res.json({Review: editedReview})
})

const deleteReview = asyncHandler( async(req,res)=>{
    if(!req.params.id) throw BadRequest('No id provided')
    const editedReview = await reviews.findByIdAndDelete(req.params.id)
    res.json({deletedReview: editedReview})
})

module.exports = { createReview,getReviews,getReview,editReview,deleteReview }