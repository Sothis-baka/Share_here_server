const User = require('../models/User');
const Post = require('../models/Post');
const checkAuth = require('../utils/checkAuth');

module.exports = {
    Mutation: {
        toggleLike: async (_, { postId }, context) => {
            const userPayload = checkAuth(context);
            // User didn't log in / token expired
            if(!userPayload)
                return { status: 401 };

            const username = userPayload.username;
            const user = await User.findOne({ username });
            const post = await Post.findById(postId);

            const uIndex = user.likes.indexOf(postId);
            const pIndex = post.likes.indexOf(username);

            // Update both user and post in database
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

            return { status: 204, like: !(uIndex >= 0) };
        }
    }
}