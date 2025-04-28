const { Schema, model } = require('mongoose');

const reservationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    showtime: { type: Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seats: { type: Number, required: true, min: 1 }
}, { timestamps: true });

module.exports = model('Reservation', reservationSchema);