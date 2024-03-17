const userResolver = require("./user.resolver")
const gameCategoryResolver = require('./game.category.resolver')
const gameResolver = require('./game.resolver')
const root_resolver = {
    ...userResolver,
    ...gameCategoryResolver,
    ...gameResolver
}

module.exports = root_resolver