//Catch asychnonous error
module.exports=(fn)=>{
    return(req, res, next)=>{
        fn(req, res, next).catch((error)=>{
return res.status(500).json({
    message: error.message,
    fullError: error
})
        })
    }
}