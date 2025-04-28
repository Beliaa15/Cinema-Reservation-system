const { Schema, model } = require('mongoose');
const reservationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    showtime: { type: Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seats: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);
// compound index to prevent duplicate bookings
reservationSchema.index({ user: 1, showtime: 1 }, { unique: true });
module.exports = model('Reservation', reservationSchema);
