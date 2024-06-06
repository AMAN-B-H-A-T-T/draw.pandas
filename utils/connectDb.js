const mongoose = require('mongoose')

const connect_db = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/draw-pandas")
    .then(response =>{
        console.log("connection success")
    })
    .catch(error => {
        console.log(error.message)
    })
}
module.exports = {
    connect_db
}