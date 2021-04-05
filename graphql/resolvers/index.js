const postResolvers = require('./posts');
const userResolvers = require('./users');
const replyResolvers = require('./replies');
const likeResolvers = require('./likes');

module.exports = {
    Query: {
        ...postResolvers.Query,
        ...replyResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...replyResolvers.Mutation,
        ...likeResolvers.Mutation
    }
}