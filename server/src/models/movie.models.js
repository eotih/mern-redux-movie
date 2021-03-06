const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
const Movie = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
        description: { type: String, required: true },
        image: { type: String, default: '' },
        trailerUrl: { type: String, default: '' },
        movieUrl: { type: String, default: '' },
        
        country: { type: String, required: true },
        releaseDate: { type: Date, required: true },
        director: { type: String, required: true },
        duration: { type: Number, required: true },

        actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        

        rate: { type: Number, required: true, default: 0 },
        rateCount: { type: Number, default: 0 },
        
        IMDbScore: { type: Number, default: 0, max: 10 }, // Điểm IMDb được tính theo thang điểm 10
        status: { type: String, required: true },

        comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

        isHot: { type: Boolean, default: false },
        isFresh: { type: Boolean, default: false },
        isComingSoon: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        isSeries: { type: Boolean, default: false }

    },
    {
        timestamps: true,
    }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Movie', Movie);