const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        image: { type: String, default: '' },
        mobile: { type: String },
        googleId: { type: String },
        isAdmin: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', User);