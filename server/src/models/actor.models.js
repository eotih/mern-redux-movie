const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
const Actor = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
        image: { type: String, required: true },
        DateOfBirth: { type: Date, required: true }        

    }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Actor', Actor);