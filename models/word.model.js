const mongoose = require('mongoose')

const Word = mongoose.model("Word",mongoose.Schema({
    word_name : {
        type : String,
        required: true
    }
}))

module.exports = Word