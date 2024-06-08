
let io_obj
let socket_obj 

function initilizedSocket(io,roomId){    
    io.of(`/game/${roomId}`).on('connection',(socket)=>{
        console.log("connection established")
        socket_obj = socket
        //join private creator in room 
        socket.on("createRoom",(room_id)=>{
        
            socket.join(room_id)
            socket.nsp.to(room_id).emit("room_creation","this is the initial message")
            console.log("room is create and player is joined")
        })
        
        socket.on("joinRoom",(room_id)=>{
            socket.join(room_id)
            console.log("player has been joined in room")
        })
        
        socket.on("getRoomCount",(room_id)=>{
            console.log(socket.nsp.adapter.rooms);  
        })
        socket.on('disconnect',()=>{
            console.log("disconnected")
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