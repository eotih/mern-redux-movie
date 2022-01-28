const Movie = require('../models/movie.models');
const { movieValidate } = require('../helpers/validation.helpers');

class MovieController {
    async show(req, res, next) {
        const listMovie = await Movie
            .find()
            .sort({ createdAt: -1 })
            .populate('categories')
            .populate('actors')
        res.status(200).json(listMovie);
    }

    async findBySlug(req, res, next) {
        const listMovie = await Movie
            .findOne({ slug: req.params.slug })
            .populate('categories')
            .populate('actors')
        res.status(200).json(listMovie);
    }

    async create(req, res, next) {
        const { name } = req.body;

        // const { error } = movieValidate(req.body);
        // if (error) throw error.details[0].message;

        const exitsMovie = await Movie.findOne({ name });
        if (exitsMovie) throw "Movie này đã tồn tại.";

        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json({
            movie: newMovie,
            message: 'Movie created successfully!',
            status: 200
        });
    }
    async update(req, res, next) {

        // const { error } = movieValidate(req.body);
        // if (error) throw error.details[0].message;

        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) throw "Movie này không tồn tại.";

        res.status(200).json({
            movie: updatedMovie,
            message: 'Movie updated successfully!',
            status: 200
        });

    }
    async deleteMovie(req, res, next) {
        const movieExists = await Movie.findOne({ _id: req.params.id });
        if (!movieExists) throw "Movie này không tồn tại.";
        await Movie.findByIdAndRemove(req.params.id);
        res.status(200).json({
            message: 'Movie deleted successfully!',
            movie: movieExists,
            status: 200
        });
    }
}

module.exports = new MovieController();