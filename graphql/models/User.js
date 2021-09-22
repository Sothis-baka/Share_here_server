const { model, Schema } = require('mongoose');

const User = new Schema({
    username: String,
    password: String,
    joinDate: String,
    posts: [String],
    likes: [String]
}, { collection: 'users' });

module.exports = model('User', User);