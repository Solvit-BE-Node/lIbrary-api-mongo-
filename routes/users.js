const express = require('express');
const { createBookReview, UpdateBookReview, deleteBookReview } = require('../controllers/reviews');

const {register, login, getUserProfile, initiatePasswordReset, resetPassword, logout} = require('../controllers/users')
const {authenticate, authorize} = require('../middlewares/auth')

const router = express.Router({mergeParams:true});

router.route('/auth/register').post(register)
router.route('/auth/login').post(login)
router.route('auth/initiate').post(initiatePasswordReset)
router.route('auth/reset').post(resetPassword)
router.route('auth/logout').post(logout)

router.route("book/:book_id/review").post(createBookReview);
router.route("/book/:book_id/:review_id").post(UpdateBookReview);
router.route("/book/:book_id/:review_id").delete(deleteBookReview);


module.exports = router 
