const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
const Category = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
        isActive: { type: Boolean, default: true }
    }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Category', Category);