const mongoose = require('mongoose')

const Rounds = mongoose.model("Rounds",mongoose.Schema({
    player : {
        type : mongoose.Schema.Types.ObjectId,
        ref:  "Player",
        required : true
    },
    word_detail : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Word",
        required : true
    }
}))
module.exports = Rounds