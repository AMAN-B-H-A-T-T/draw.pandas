const bcrypt = require('bcrypt')
const { User } = require('../models/user.mode')
const { generate_accessToken } = require('../utils/jwthelper')
require('dotenv').config()

const generate_hashed_password = async(password)=>{
    return bcrypt.hash(password,parseInt(process.env.SALT_ROUND))
    .then((password)=>{
        return password
    })
    .catch((error)=>{
        throw error
    })
}

const checkPassword = async(user_password,hashed_password)=>{
    const flag = bcrypt.compareSync(user_password,hashed_password)
    return flag
}
module.exports = {
    user: (args)=>{
        const filter = {user_email: args.user_email}
        console.log(filter)
        return User.findOne(filter)
        .then((user)=>{
            return {...user._doc,_id:user._doc._id}
        })
        .catch((error)=>{
            throw error
        })
    },
    create_user: async(args,req)=>{
        const model = {
            user_name: args.userinput.user_name,
            user_email: args.userinput.user_email,
            user_password: await generate_hashed_password(args.userinput.user_password)
        }
        console.log(model)
        const new_user = new User(model)
        return new_user.save()
        .then((user)=>{
            return {...user._doc,_id:user._doc._id}
        })
        .catch((error)=>{
            throw error
        })
    },
    
    login: async(args,req)=>{
        const filter = {user_email: args.user_email}
        return User.findOne(filter)
        .then(async(user)=>{
            if(user){
                if(await checkPassword(args.user_password,user.user_password)){
                    const result = generate_accessToken({"user_name":user.user_name,"user_email":user.user_email,"user_id":user._id})
                    if(!result.error){
                        return {accessToken: result.token}    
                    }
                    else{
                        throw new Error(result.message)
                    }
                    
                }
                else{
                    throw new Error("Password does not matched")
                }
            }
            throw new Error("user with this crenditials is not exist")
        })
        .catch((error)=>{
            throw error
        })
    }
}