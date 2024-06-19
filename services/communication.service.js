const client = require("../utils/redis_client")

async function getRoomUserInfo(room_id){
    try{
        
        const userInfo = await client.lrange(`user_list:${room_id}`,0,-1)
        return userInfo
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = {
    getRoomUserInfo
}