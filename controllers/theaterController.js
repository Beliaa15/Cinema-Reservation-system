const Theater = require('../models/Theater');

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
            return res.status(404).json({ message: 'Theater not found' });
        }
        res.json(theater);
    } catch (error) {
        next(error);
    }
};