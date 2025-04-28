const Movie = require("../models/Movie");
const Theater = require("../models/Theater");
const Showtime = require("../models/Showtime");

exports.list = async (req, res, next) => {
  try {
    res.json(await Showtime.find());
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const showtime = await Showtime.findById(req.params.id)
      .populate("movie")
      .populate("theater");

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.json(showtime);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    // Validate movie exists
    const movie = await Movie.findById(req.body.movie);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Validate theater exists
    const theater = await Theater.findById(req.body.theater);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    // Validate screen exists in theater
    const screenExists = theater.screens.some(
      (screen) => screen.name === req.body.screen
    );
    if (!screenExists) {
      return res
        .status(404)
        .json({ message: "Screen not found in this theater" });
    }

    res.status(201).json(await Showtime.create(req.body));
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.json(showtime);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.status(204).json({ message: "Showtime deleted" });
  } catch (error) {
    next(error);
  }
};

exports.getByTheater = async (req, res, next) => {
  try {
    res.json(
      await Showtime.find({ theater: req.params.theaterId })
        .populate("movie")
        .populate("theater")
    );
  } catch (error) {
    next(error);
  }
};
