const Movie = require('../models/Movie');

exports.list = async (req, res, next) => {
    try {
        const query = {};

        // Filter by genre if specified
        if (req.query.genre) {
            query.genres = req.query.genre;
        }

        // Support multiple genres filtering
        if (req.query.genres) {
            const genreList = Array.isArray(req.query.genres)
                ? req.query.genres
                : req.query.genres.split(',');
            query.genres = { $in: genreList };
        }

        // Search by title
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: 'i' };
        }

        res.json(await Movie.find(query));
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        res.status(201).json(await Movie.create(req.body));
    } catch (error) {
        next(error);
    };
};

exports.update = async (req, res, next) => {
    try {
        res.json(await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (error) {
        next(error)
    };
};

exports.remove = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(204).json({ message: 'Movie deleted' });
    } catch (error) {
        next(error)
    };
};

exports.getGenres = async (req, res, next) => {
    try {
        res.json(Movie.GENRES);
    } catch (error) {
        next(error);
    }
};