const express = require('express')
const { createPlayerController } = require('../controller/player.controller')
const route = express.Router()

route.post("/create-player",createPlayerController)

module.exports = route