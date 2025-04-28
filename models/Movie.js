const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String },
    duration: { type: Number, required: true, min: 1 }
}, { timestamps: true });

module.exports = model('Movie', movieSchema);