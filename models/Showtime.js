const { Schema, model } = require("mongoose");
const showtimeSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    theater: { type: Schema.Types.ObjectId, ref: "Theater", required: true },
    screen: { type: String, required: true },
    date: Date,
    time: String,
    availableSeats: { type: Number, required: true, min: 0 },
    ticketPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);
module.exports = model("Showtime", showtimeSchema);
