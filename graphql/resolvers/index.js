const userResolvers = require('./users');
const postResolvers = require('./posts');
const repliesResolver = require('./replies');
const likesResolver = require('./likes');

module.exports = {
    Query: {
        ...postResolvers.Query,
        ...repliesResolver.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...repliesResolver.Mutation,
        ...likesResolver.Mutation
    }
};