const User = require('../model/User');
const Post = require('../model/Post');
const Reply = require('../model/Reply');
const checkAuth = require('../utils/checkAuth');

module.exports = {
    Query: {
        getPosts: async () => {
            return Post.find().sort({ lastActive: -1 });
        }
    },

    Mutation: {
        createPost: async (_, { postInput: { title, content } }, context) => {
            const userPayload = checkAuth(context);
            // in case user didn't log in / token expired
            if(!userPayload){
                return {
                    message: "Auth failed",
                    success: false
                };
            }

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

            // save the post in database
            await post.save();

            // update the post in user's profile
            const user = await User.findOne({ username });
            user.posts.push(post.id);
            await user.save();

            return {
                message: "Post created",
                success: true,
                post
            };
        },

        deletePost: async (_, { postId }, context) => {
            const userPayload = checkAuth(context);
            // in case user didn't log in / token expired
            if(!userPayload){
                return {
                    message: "Auth failed",
                    success: false
                };
            }

            const user = await User.findOne({ username: userPayload.username });
            const post = await Post.findById(postId);
            const index = user.posts.indexOf(postId);
            // in case post doesn't exist or user doesn't have authority to access
            if(!post || index < 0){
                return {
                    message: "Can't find post with given information",
                    success: false
                };
            }

            // update the post in user profile
            user.posts.splice(index, 1);
            await user.save();

            // remove the post from database
            await Post.deleteOne({ _id: postId });

            // remove all replies under the post from database
            await Reply.deleteMany({ postId });

            return {
                message: "Post removed",
                success: true
            };
        }
    }
}