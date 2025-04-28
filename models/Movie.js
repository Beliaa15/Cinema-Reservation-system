const { Schema, model } = require('mongoose');

const GENRES = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Horror',
    'Thriller', 'Sci-Fi', 'Fantasy', 'Romance', 'Animation',
    'Documentary', 'Family', 'Mystery', 'Crime', 'Biography'
];

const movieSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: String,
    genres: [{
        type: String,
        enum: GENRES,
        required: true
    }],
    poster: String,
    releaseDate: Date,
    duration: { type: Number, required: true, min: 1 },
    director: String,
    cast: [String],
    rating: { type: Number, min: 0, max: 10 }
}, { timestamps: true });

// Export genres for reuse in controllers
movieSchema.statics.GENRES = GENRES;

module.exports = model('Movie', movieSchema);