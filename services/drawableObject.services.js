const Word = require("../models/word.model")

async function getDrawable_object(){
    try{
        const word_list = await Word.aggregate([{$sample : {"size":3}}])    
        return word_list
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = {
    getDrawable_object
}