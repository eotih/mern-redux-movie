const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
const ReplyComment = new Schema(
    {
        content: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);
const Comment = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
        content: { type: String, required: true },
        reply: [ReplyComment],
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Comment', Comment);