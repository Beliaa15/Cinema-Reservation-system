const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Showtime = require('../models/Showtime');

exports.book = async (req, res, next) => {
    const { showtime: stId, seats } = req.body;
    const user = req.user._id;

    try {
        // Find the showtime first
        const showtime = await Showtime.findById(stId);

        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        if (showtime.availableSeats < seats) {
            return res.status(400).json({ message: 'Insufficient seats available' });
        }


        // Create the reservation
        const reservation = await Reservation.create({
            user,
            showtime: stId,
            seats
        });

        // Update available seats
        showtime.availableSeats -= seats;
        await showtime.save();

        res.status(201).json({
            message: 'Reservation successful',
            reservation: reservation
        });
    } catch (error) {
        console.error('Reservation error:', error.message);

        // If this is a duplicate key error (user already has a reservation for this showtime)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You already have a reservation for this showtime' });
        }

        // If the seat update failed, we should handle it
        // In a production app, you might want to implement a rollback mechanism here

        return next(error);
    }
};

exports.listUser = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id })
            .populate({
                path: 'showtime'
            });

        res.json(reservations);
    } catch (error) {
        next(error);
    }
};

exports.cancel = async (req, res, next) => {
    try {
        // Find the reservation to be cancelled
        const reservation = await Reservation.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Get the associated showtime
        const showtime = await Showtime.findById(reservation.showtime);

        if (!showtime) {
            return res.status(404).json({ message: 'Associated showtime not found' });
        }

        // Return the seats to the available pool
        showtime.availableSeats += reservation.seats;
        await showtime.save();

        // Delete the reservation
        await Reservation.findByIdAndDelete(reservation._id);

        // Return success response
        res.status(200).json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
        console.error('Cancellation error:', error.message);
        return next(error);
    }
};

exports.listAll = async (req, res, next) => {
    try {
        const reservations = await Reservation.find()
            .populate('user', '-password') // Exclude password
            .populate({
                path: 'showtime'
            });

        res.json(reservations);
    } catch (error) {
        next(error);
    }
};