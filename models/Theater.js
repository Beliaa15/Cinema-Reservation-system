const { Schema, model } = require('mongoose');

const theaterSchema = new Schema({
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    totalSeats: { type: Number, required: true, min: 1 },
    screens: [{
        name: { type: String, required: true },
        capacity: { type: Number, required: true, min: 1 }
    }]
}, { timestamps: true });

module.exports = model('Theater', theaterSchema); 