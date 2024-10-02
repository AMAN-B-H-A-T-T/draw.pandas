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

async function  HandlePlayerTurn(room_id,player_ptr) {
    try{
        const user_list = await client.lrange(`user_list:${room_id}`,0,-1)
        player_ptr = (player_ptr + 1) % user_list.length 
        console.log(user_list[player_ptr])
         return {"details" : user_list[player_ptr] , player_ptr}
    }
    catch(error){
        throw new Error(error.message)
    }
        
}

module.exports = {
    getRoomUserInfo,
    HandlePlayerTurn
}