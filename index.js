const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// load env variables
require('dotenv').config();

// load typeDefs and resolvers for graphql
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req} ) => ({ req }),
    // allow client side introspection, should set to false in production mode
    introspection: false,
});

mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to Mongo Database');
        return server.listen({ port: process.env.PORT || 4000 });
    }).then(res => console.log(`Server running at ${res.url}`));