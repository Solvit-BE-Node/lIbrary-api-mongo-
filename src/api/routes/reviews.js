const express = require('express')
const router = express.Router()

const {addBookReview} = require('../controllers/reviews');

router.route('/:id').post(addBookReview);

module.exports = router