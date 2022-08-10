
const logger = require('../config/logger')
const User = require('../models/users')
const {NotFound, BadRequest, Unauthorized} = require('http-errors')
const {createUserActivationToken, checkUserActivationToken, createUserResetToken, checkUserResetToken} = require('./auth')
const {sendUserActivationEmail, sendUserPasswordResetEmail} = require('./mail')

/**
 * 
 * @param {email: string, password: string, firstname: string, lastnane: string} userData 
 * @return {} user 
 */
const createUser = async (userData) => {
    const existingUser = await User.findOne({email:userData.email})
    if(existingUser) throw new BadRequest('a user with this email already exists')
    const user = new User(userData)
    await user.save()
    const activationToken = await createUserActivationToken(user)
    await sendUserActivationEmail(activationToken, user)
    return user 
}

module.exports = {
    createUser
}
