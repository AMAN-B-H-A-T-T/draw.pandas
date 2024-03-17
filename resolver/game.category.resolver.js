const Game_Category = require("../models/category.model")

module.exports = {
    game_category: async(args,req)=>{
        const model = {
            game_type: args.game_type
        }
        const new_category = new Game_Category(model)
        return new_category.save()
        .then((category)=>{
            return {...category._doc,_id:category._doc._id}
        })
        .catch((error)=>{
            throw error
        })
    }
}