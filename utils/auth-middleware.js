const verify_user = (req,res,next)=>{
    const headers = req.headers
    // console.log(headers)
    req.users = 1
    return next()
}
module.exports = verify_user