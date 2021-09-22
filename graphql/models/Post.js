const { model, Schema } = require('mongoose');

const Post = new Schema({
    title: String,
    content: String,
    username: String,
    postAt: String,
    lastActive: String,
    likes: [String]
}, { collection: 'posts' });

module.exports = model('Post', Post);