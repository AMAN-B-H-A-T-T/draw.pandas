const { createPlayer, roomcreationservices, addPlayersToRoomService, deletePlayer } = require("../services/player.service")
const { generate_random } = require("../utils/random")
const client = require("../utils/redis_client")
const { getIoObject, initilizedSocket, getSocketObject } = require("../utils/socket_connection")

const createPlayerController = async(req,res)=>{
    try{
        const model = {
            player_name : req.body.player_name,
            player_profile_image : req.body.player_profile_image,
            score : parseInt(req.body.score),
            is_private_room_creator : req.body.is_private_room_creator,
            room_id : req.body.room_id
        }
        createPlayer(model,(error,playerObj)=>{
            if(error){
                return res.status(error.status_code).send({
                    "message":"error",
                    "error":error.error
                })
            }
            //add the room creator in room
            if(model.is_private_room_creator && model.room_id == null){
                let player  = []
                player.push(playerObj._id)
                const room_model = {
                    players : player,
                    room_id : generate_random().toString(),
                    round : 3,
                    round_details : null
                }
                roomcreationservices(room_model,async(error,result)=>{
                    if(error){
                        return res.status(error.status_code).send({
                            "message":"error",
                            "error":error.error
                        })
                    }
                    await client.set(`user:${playerObj._id}`,JSON.stringify(playerObj),'NX')
                    await client.set('score:${playerObj._id}',0,'NX')
                    const io = getIoObject()
                    initilizedSocket(io,result._id)
                    return res.status(200).send({
                        "message":"success",
                        "data":result
                    })
                })
            }
            //add the non-room creator in room
            else if(model.is_private_room_creator == false && model.room_id != ""){
                addPlayersToRoomService(model.room_id,playerObj._id,async(error,result)=>{
                    if(error){
                        return res.status(error.status_code).send({
                            "message":"error",
                            "error":error.error
                        })
                    }
                    await client.set(`user:${playerObj._id}`,JSON.stringify(playerObj),'NX')
                    await client.set(`score:${playerObj._id}`,0,'NX')
                    return res.status(200).send({
                        "message":"success",
                        "data":result
                    })
                })
            }
            else{
                deletePlayer(result._id,(error,result)=>{
                  if(error){
                    return res.status(error.status_code).send({
                        "message":"error",
                        "error":error.error
                    })
                  }  
                  return res.status(500).send({
                    "message":"error",
                    "error":"Please enter the valid details"
                })
                })
                
            }
        })
    }
    catch(error){
        res.status(500).send({
            "message":"error",
            "error":error.message
        })
    }
}

module.exports = {
    createPlayerController
}