const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  cinemaId: { type: String, required: true },
  cinemaName: { type: String, required: true },
  movieTitle: { type: String, required: true },
  moviePoster: { type: String, required: true },
  orderNumber: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  seats: { type: [String], required: true },
  date: { type: String, required: true }, 
  time: { type: String, required: true }, 
  ticketPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  totalTickets: { type: Number, required: true },
  convenienceFee: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  paymentSuccess: { type: Boolean, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;