
const { getRoomUserInfo, HandlePlayerTurn } = require("../services/communication.service")
const { getDrawable_object } = require("../services/drawableObject.services")
const client = require("./redis_client")

let io_obj
let socket_obj 

function initilizedSocket(io,roomId){    
    io.of(`/game/${roomId}`).on('connection',(socket)=>{
        console.log("connection established")
        socket_obj = socket
        //join private creator in room 
        socket.on("createRoom",async(room_id)=>{
        
            socket.join(room_id)
            const userInfo = await client.lrange(`user_list:${room_id}`,0,-1)
            
            socket.nsp.to(room_id).emit("room_creation",userInfo)
            
        })
        
        socket.on("joinRoom",async(room_id)=>{
            socket.join(room_id)
            const userInfo = await getRoomUserInfo(room_id)
            socket.nsp.to(room_id).emit("room_creation",userInfo)
        })
        
        socket.on("getRoomCount",(room_id)=>{
            console.log(socket.nsp.adapter.rooms);  
        })
        socket.on('disconnect',()=>{
            console.log("disconnected")
        })

        socket.on('round_change',(message)=>{
            const rounds = JSON.parse(message)
            socket.nsp.to(rounds.room_id).emit('round_count',rounds.rounds)
        })

        socket.on('start_game',async(data)=>{
            const {room_id,round_count,player_ptr} = JSON.parse(data)
            const player = await HandlePlayerTurn(room_id,-1)
            console.log(player)
            const player_data = {
                round_count : round_count,
                turn_details : player.details,
                player_ptr : player.player_ptr
            }
            socket.nsp.to(room_id).emit('start_game_response',JSON.stringify(player_data))
        })

        socket.on('get_drawable_objects',async(room_id)=>{
            const word_list = JSON.stringify(await getDrawable_object())
            socket.nsp.to(room_id).emit('drawable_object_response',word_list)
        })

        socket.on('word_selection',(data)=>{
            const {word_details , room_id} = JSON.parse(data)
            socket.nsp.to(room_id).emit('word_selection_response',JSON.stringify(word_details))
        })

        socket.on('canvas_data',(data)=>{
            const {canvas,room_id} = data
            socket.nsp.to(room_id).emit('canvas_data_response',canvas)
        })

        socket.on('room_chat',(message)=>{
            const data = JSON.parse(message)
            console.log(data)
            socket.nsp.to(data.room_id).emit('room_chat',message)
        })

        socket.on('turns',(message)=>{
            const data = JSON.parse(message)
            const player = HandlePlayerTurn(data.room_id,data.player_ptr)
            const respons = {
                turn_details : player.details,
                player_ptr : player.player_ptr
            }
            socket.nsp.to(data.room_id).emit('turns',data.JSON.stringify(respons))
        })
    })   
}

function getSocketObject(){
    return socket_obj
}

function setIoObject(io){
    io_obj = io
}
function getIoObject(){
    return io_obj
}

module.exports = {
    getSocketObject,
    initilizedSocket,
    setIoObject,
    getIoObject
}