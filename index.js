const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { connect_db } = require('./utils/connectDb')
const PORT = 4000
const app = express()


try{
    app.use(cors())
    connect_db()
    app.use(bodyParser.json())
}
catch(error){
    console.log(error.message)
}


app.listen(PORT,(req,res)=>{
    console.log("http://localhost:4000")
})