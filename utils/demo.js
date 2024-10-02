const client = require("./redis_client");


async function  HandlePlayerTurn(room_id,player_ptr) {
    try{
        const user_list = await client.lrange(`user_list:${room_id}`,0,-1)
        player_ptr = (player_ptr + 1) % user_list.length 
        console.log(user_list[player_ptr])
         return user_list[player_ptr]
    }
    catch(error){
        throw new Error(error.message)
    }
        
}
HandlePlayerTurn("LSAJLL",1)