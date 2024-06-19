
const { getRoomUserInfo } = require("../services/communication.service")
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
            console.log(userInfo)
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
            console.log(rounds)
            socket.nsp.to(rounds.room_id).emit('round_count',rounds.rounds)
        })

        socket.on('start_game',(data)=>{
            const {room_id,round_count} = data
            socket.nsp.to(room_id).emit('start_game_response',round_count)
        })

        socket.on('get_drawable_objects',async(room_id)=>{
            const word_list = JSON.stringify(await getDrawable_object())
            console.log(word_list)
            socket.nsp.to(room_id).emit('drawable_object_response',word_list)
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