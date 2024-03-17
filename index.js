const express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')

const root_resolver = require('./resolver/index');
const schemas = require('./schemas');
const verify_user = require('./utils/auth-middleware');
const { connect_db } = require('./utils/db_connect');


const PORT = 4000;
const app = express()

try{
    connect_db();
    app.use(bodyParser.json())
    app.use(verify_user);
    app.use("/graphQl",graphqlHTTP({
        schema: schemas,
        rootValue: root_resolver,
        graphiql: true,
        
    }))
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    

    app.listen(PORT,()=>{
        console.log("listen on http://localhost:4000")
    })
}
catch(error){
    console.log(error.message)
}

