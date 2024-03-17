const { Game } = require("../models/games.model")
const Player = require("../models/player.model")
const Room = require("../models/room.model")
const { generate_randowm } = require("../utils/random")

module.exports = {
    game: async(args,req)=>{
        if(req.is_auth){
            const model = {
                user: req.userDetails.user_id,
                game_type: args.gameinput.game_type,
                tot_rounds: args.gameinput.tot_rounds,
                drawing_time: args.gameinput.drawing_time
            }
            const new_Game = new Game(model)
            return new_Game.save()
            .then((game)=>{
                const model = {
                    game: game._id,
                    room_id: generate_randowm()
                }
                const new_room = new Room(model)
                return new_room.save()
                .then(async(room)=>{
                    const model = {
                        user: req.userDetails.user_id,
                        room: room._id,
                    }
                    const new_player = new Player(model)
                    await new_player.save()
                    return {...room._doc,_id:room._doc._id,game:room._doc.gmae}
                })
                .catch((error)=>{
                    throw error
                })
            })
            .catch((error)=>{
                throw error
            })
        }
        else{
            throw new Error("You have not crenditials to prefrom this actio..!")
        }
    }
}