const { Schema, model } = require('mongoose');

const showtimeSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    startsAt: { type: Date, required: true },
    seatsAvailable: { type: Number, required: true, min: 1 }
}, { timestamps: true });

module.exports = model('Showtime', showtimeSchema);