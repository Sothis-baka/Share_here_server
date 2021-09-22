const User = require('../models/User');
const Post = require('../models/Post');
const Reply = require('../models/Reply');
const checkAuth = require('../utils/checkAuth');

module.exports = {
    Query: {
        // Return all posts in timeline.
        getPosts: async () => {
            return Post.find().sort({ lastActive: -1 });
        },

        findPost: async (_, { postId }) => {
            return Post.findById(postId);
        }
    },

    Mutation: {
        createPost: async (_, { postInput: { title, content } }, context) => {
            const userPayload = checkAuth(context);

            // User didn't log in / token expired
            if(!userPayload)
                return { status: 401 };

            const username = userPayload.username;
            const curTime = new Date().getTime();

            const post = new Post({
                title,
                content,
                username,
                postAt: curTime,
                lastActive: curTime,
                likes: []
            });

            // Save the post in database
            await post.save();

            // Update the post in user's profile
            const user = await User.findOne({ username });
            user.posts.push(post.id);
            await user.save();

            return {
                status: 201,
                post
            };
        },

        deletePost: async (_, { postId }, context) => {
            const userPayload = checkAuth(context);

            // User didn't log in / token expired
            if(!userPayload)
                return { status: 401 };

            const user = await User.findOne({ username: userPayload.username });
            const post = await Post.findById(postId);
            const index = user.posts.indexOf(postId);

            // Post doesn't exist
            if(!post)
                return { status: 404 };

            // User doesn't have authority to access
            if(index<0)
                return { status: 403 };

            // Update the post in user profile
            user.posts.splice(index, 1);
            await user.save();

            // Remove the post from database
            await Post.deleteOne({ _id: postId });

            // Remove all replies under the post from database
            await Reply.deleteMany({ postId });

            return { status: 204 };
        }
    }
}