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