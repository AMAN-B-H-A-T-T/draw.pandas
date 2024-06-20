const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const http = require('http')
const { connect_db } = require('./utils/connectDb')
const { setIoObject } = require('./utils/socket_connection')
const PORT = 4000
const app = express()
const path = require('path')
const Server = http.createServer(app)

const allowedOrigins = ['http://localhost:4000', 'https://draw-pandas.onrender.com'];

const io = socketIo(Server,{
  cors: {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
  })
try{
    
    setIoObject(io)
    app.use(cors({
      origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }));
    connect_db()
    app.use(bodyParser.json())
    app.use("/api/manage",require('./routes/player.routes'))
    app.use(express.static(path.join(__dirname, "/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
}
catch(error){
    console.log(error.messge)
}


Server.listen(PORT,(req,res)=>{
    console.log(`Server is running on port 4000`)
})