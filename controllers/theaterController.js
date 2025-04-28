const Theater = require("../models/Theater");

exports.list = async (req, res, next) => {
  try {
    res.json(await Theater.find());
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.json(theater);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await Theater.create(req.body));
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.json(theater);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const theater = await Theater.findByIdAndDelete(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.status(204).json({ message: "Theater deleted" });
  } catch (error) {
    next(error);
  }
};

exports.addScreen = async (req, res, next) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    theater.screens.push(req.body);
    await theater.save();

    res.status(201).json(theater);
  } catch (error) {
    next(error);
  }
};

exports.removeScreen = async (req, res, next) => {
  try {
    const theater = await Theater.findById(req.params.theaterId);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    theater.screens = theater.screens.filter(
      (screen) => screen._id.toString() !== req.params.screenId
    );
    await theater.save();

    res.status(200).json(theater);
  } catch (error) {
    next(error);
  }
};
