const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    type Token {
        accessToken: String!
    }

    type User {
        _id: ID!
        user_name: String!
        user_email: String!
        user_password: String!
    }

    type Words {
        _id: ID!
        word_name: String!
    }

    type Game_Type {
        _id: ID!
        type: String!
    }

    type Game {
        _id: ID!
        game_type: Game_Type!
        rounds: Int!
        draw_time: Int!
    }

    type Game_Room {
        _id: ID!
        game: Game!
        room_id: String!
    }

    type Rounds {
        _id: ID!
        game_room: Game_Room!
        word: Words!
    }

    type Players {
        _id: ID!
        game_room: Game_Room!
        score: Int!
    }
    type Leader_Board {
        _id: ID!
        game_room: Game_Room!
        players: [Players!]!
    }


    input userInput{
        user_name: String!
        user_email: String!
        user_password: String!
    }



    type RootQuery{
        hello: String
        user(user_email: String!): User!
        room: Game_Room!
        players: [Players!]!
    }

    type RootMutation{
        create_user(userinput: userInput): User!
        login(user_email: String!, user_password: String!): Token!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)