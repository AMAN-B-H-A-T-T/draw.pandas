const jwt = require('jsonwebtoken')

const generate_accessToken = (userDetails)=>{
    try{
        const token = jwt.sign(userDetails,process.env.SECRET_KEY,{expiresIn: '1d'})
        return {error:false,token:token}
    }
    catch(error){
        return {error:true,message:error.message}
    }
    
}

const verify_token = (accessToken)=>{
    try{
        const token_Data = jwt.verify(accessToken,process.env.SECRET_KEY)
        return {error:false,data:token_Data}
    }
    catch(error){
        return {error:true,message:error.message}
    }
    
}

module.exports = {
    generate_accessToken,
    verify_token
}