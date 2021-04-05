const Post = require('../model/Post');
const Reply = require('../model/Reply');
const checkAuth = require('../utils/checkAuth');

module.exports = {
    Query: {
        getReplies: async (_, { postId }, context) => {
            return Reply.find({ postId }).sort( {replyAt: -1} );
        }
    },
    Mutation: {
        reply: async (_, { postId, content }, context) => {
            const userPayload = checkAuth(context);
            // in case user didn't log in / token expired
            if(!userPayload){
                return {
                    message: "Auth failed",
                    success: false
                };
            }

            const post = await Post.findById( postId );
            // in case post doesn't exist
            if(!post){
                return {
                    message: "Can't find post with given information",
                    success: false
                };
            }

            // save reply in database
            const reply = new Reply({
                username: userPayload.username,
                content,
                replyAt: new Date().getTime(),
                postId
            });
            await reply.save();

            // update post in database
            post.lastActive = new Date().getTime();
            await post.save();

            return {
                message: "Reply created",
                success: true,
                reply
            };
        },

        deleteReply: async (_, { replyId }, context) => {
            const userPayload = checkAuth(context);
            // in case user didn't log in / token expired
            if(!userPayload){
                return {
                    message: "Auth failed",
                    success: false
                };
            }

            const username = userPayload.username;
            const reply = await Reply.findOne({ _id: replyId });
            // in case reply doesn't exist or user doesn't have authority to access
            if(!reply || reply.username !== username){
                return {
                    message: "can't find reply with given information",
                    success: false
                };
            }

            // remove reply from database
            await Reply.deleteOne({ _id: replyId });

            return {
                message: "Reply deleted",
                success: true
            };
        }
    }
}