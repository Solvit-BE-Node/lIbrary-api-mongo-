const express = require('express')
const { getReviews, createReview, getReview, editReview, deleteReview } = require('../controllers/reviews')
const router = express.Router()

router.route('/').get(getReviews).post(createReview)
router.route('/:id').get(getReview).put(editReview).delete(deleteReview)


module.exports = router