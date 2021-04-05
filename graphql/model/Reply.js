const { model, Schema } = require('mongoose');

const Reply = new Schema({
    username: String,
    content: String,
    replyAt: String,
    postId: String
}, { collection: 'replies' });

module.exports = model('Reply', Reply);