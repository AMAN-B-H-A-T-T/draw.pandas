const { verify_token } = require("./jwthelper")

const verify_user = (req,res,next)=>{
    let token = req.get('authorization')
    if(!token){
        req.is_auth = false
        return next()
    }
    if(token === ""){
        req.is_auth = false
        return next()
    }
    token = token.replace("Bearer ","")
    const result = verify_token(token)
    if(!result.error){
        req.is_auth = true
        req.userDetails = result.data
        
        return next()
    }
    else{
        req.is_auth = false
        return next()
    }
}
module.exports = verify_user