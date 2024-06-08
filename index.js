const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const http = require('http')
const { connect_db } = require('./utils/connectDb')
const { setIoObject } = require('./utils/socket_connection')
const PORT = 4000
const app = express()

const Server = http.createServer(app)
const io = socketIo(Server)
try{
    
    setIoObject(io)
    app.use(cors())
    connect_db()
    app.use(bodyParser.json())
    app.use("/api/manage",require('./routes/player.routes'))
}
catch(error){
    console.log(error.messge)
}


Server.listen(PORT,(req,res)=>{
    console.log("http://localhost:4000")
})