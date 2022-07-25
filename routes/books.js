const express = require('express');
const {createBook, getBooks, getOneBook, updateBook, deleteBook} = require('../controllers/books');
const {validateCreateBook, validateUpdateBook} = require('../middlewares/validate');
const router = express.Router();


router.route('/:id').get(getOneBook).patch(validateUpdateBook,updateBook).delete(deleteBook);
router.route('/').get(getBooks).post(validateCreateBook, createBook);






module.exports = router;
