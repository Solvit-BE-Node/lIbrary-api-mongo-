const errorHandler =  (err, req, res, next) => {
    console.log('error midddleware called')
    // console.log(err.message)
    res.status(500).json({
        success: false, 
        message: err.message
    })

}

module.exports = errorHandler