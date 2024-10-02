const mongoose = require('mongoose')
require('dotenv').config()
const connect_db = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/draw-pandas")
    .then(response => {
        console.log("connection success")
    })
    .catch(error => {
        console.log(error.message)
    })
    // mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@gic.cbipwdl.mongodb.net/draw-pandas`)
    // .then(response =>{
    //     console.log("connection success")
    // })
    // .catch(error => {
    //     console.log(error.message)
    // })
}
module.exports = {
    connect_db
}