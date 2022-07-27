const { Unauthorized } = require("http-errors");
const jwt = require('jsonwebtoken');


const asyncHandler = require("./async");
const User = require("../models/users");

// Protect routes
// const authenticate = async (req, res, next) => {
//   if(!req.session || !req.session.user) throw new Unauthorized('user not logged in')
//   const user = await User.findOne({ _id: req.session.user.id });
//   req.user = user 
//   if (!user) throw new Unauthorized("please login");
//   next()
// };

const authenticate = async (req, res, next) => {
    console.log(req.headers)
    if(!req.headers.authorization) throw new Unauthorized('no token present in header')
    const token = req.headers.authorization.split(' ')[1]
    const userInfo = jwt.verify(token, 'some secret key')
    console.log(userInfo)
    req.user = userInfo
    next()
};


const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Unauthorized(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};
