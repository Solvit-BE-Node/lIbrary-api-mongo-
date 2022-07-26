const bcrypt = require('bcrypt');

const User = require('../models/users')
const Wallet = require('../models/wallet')
const {NotFound, BadRequest, Unauthorized} = require('http-errors')
const asyncHandler = require('../middlewares/async')

const register = asyncHandler(async (req, res, next) => {
    const existingUser = await User.findOne({email:req.body.email})
    if(existingUser) throw new BadRequest('a user with this email already exists')
    const user = new User(req.body)
    await user.save()
    res.status(201).json({
        success:true,
        data:user
    })
})

const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({email: req.body.email})
    if(!user) throw new NotFound('no user with this email exists')
    const valid = await bcrypt.compare(password, user.password)
    if(!valid) throw new BadRequest('invalid password')
    res.status(200).json({
        success:true,
        data:user
    })


})


const getUser = asyncHandler(async (req, res, next) => {
})


const getUsers = asyncHandler(async (req, res, next) => {
    req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
    console.log(req.session)
    // const user = await User.find().populate('wallet')
    res.status(201).json({
        success:true, 
        data:''
    })
})


module.exports = {
   register,
   login,
    getUsers
}