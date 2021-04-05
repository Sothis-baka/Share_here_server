const User = require('../model/User');
const Post = require('../model/Post');
const checkAuth = require('../utils/checkAuth');

module.exports = {
    Mutation: {
        toggleLike: async (_, { postId }, context) => {
            const userPayload = checkAuth(context);
            // in case user didn't log in / token expired
            if(!userPayload){
                return {
                    message: "Auth failed",
                    success: false
                };
            }

            const username = userPayload.username;
            const user = await User.findOne({ username });
            const post = await Post.findById(postId);

            const uIndex = user.likes.indexOf(postId);
            const pIndex = post.likes.indexOf(username);

            if(uIndex >= 0){
                // unlike
                user.likes.splice(uIndex, 1);
                post.likes.splice(pIndex, 1);
            }else {
                // like
                user.likes.push(postId);
                post.likes.push(username);
            }

            await user.save();
            await post.save();

            return {
                message: "Like status changes",
                success: true
            };
        }
    }
}