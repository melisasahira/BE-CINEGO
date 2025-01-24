const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  seats: [{ type: String, required: true }],
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }],
  price: { type: Number, required: true }, 
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
