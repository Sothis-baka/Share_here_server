const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req} ) => ({ req }),
    introspection: true,
    playground: true,
});

mongoose
    .connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to Mongo Database');
        return server.listen({ port: process.env.PORT || 4000 });
    }).then(res => console.log(`Server running at ${res.url}`));