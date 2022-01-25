const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
const Series = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
        movie: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
        isActive: { type: Boolean, default: true }
    }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Series', Series);