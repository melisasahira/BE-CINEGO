const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); 

router.post('/', async (req, res) => {
    try {
        const {
            userId,
            movieId,
            cinemaId,
            cinemaName,
            movieTitle,
            moviePoster,
            orderNumber,
            paymentMethod,
            seats,
            date, 
            time,
            ticketPrice,
            totalPrice,
            totalTickets,
            convenienceFee,
            status,
            paymentSuccess,
        } = req.body;

        if (!userId || !movieId || !cinemaId || !cinemaName || !movieTitle || !orderNumber || !seats || !date || !time) {
            return res.status(400).send({ message: 'All fields must be provided and valid.' });
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
        const timeRegex = /^\d{2}:\d{2}$/; 
        if (!dateRegex.test(date) || !timeRegex.test(time)) {
            return res.status(400).send({ message: 'Invalid date or time format.' });
        }

        const booking = new Booking({
            userId,
            movieId,
            cinemaId,
            cinemaName,
            movieTitle,
            moviePoster,
            orderNumber,
            paymentMethod,
            seats,
            date, 
            time, 
            ticketPrice,
            totalPrice,
            totalTickets,
            convenienceFee,
            status: status || 'pending', 
            paymentSuccess,
        });

        const savedBooking = await booking.save();
        res.status(201).send({ message: 'Booking created successfully!', booking: savedBooking });
    } catch (error) {
        console.error('Failed to create booking:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;