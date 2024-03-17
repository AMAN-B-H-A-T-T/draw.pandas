const mongoose = require('mongoose')

const connect_db = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/draw-pandas")
    .then(()=>{
        console.log("connection established successfully")
    })
    .catch((error)=>{
        console.log(error.message)
    })
}
module.exports = {
    connect_db
}