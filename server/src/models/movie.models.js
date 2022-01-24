const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Movie = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: { type: String, default: '' },
        country: { type: String, required: true },
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        releaseDate: { type: Date, required: true },
        
        director: { type: String, required: true },
        actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
        
        trailerUrl: { type: String, default: '' },
        movieUrl: { type: String, default: '' },
        duration: { type: Number, required: true },

        rate: { type: Number, required: true },
        rateCount: { type: Number, default: 0 },
        status: { type: String, required: true },

        isHot: { type: Boolean, default: false },
        isNew: { type: Boolean, default: false },
        isComingSoon: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        isSeries: { type: Boolean, default: false }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Movie', Movie);