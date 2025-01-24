const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  rating: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  synopsis: { type: String, required: true },
  cast: { type: [String], required: true },
  director: { type: String, required: true },
  writer: { type: [String], required: true },
  duration: { type: Number, required: true },
  genre: { type: [String], required: true },
  cinema: { type: mongoose.Schema.Types.ObjectId, ref: "Cinema", required: true }, 
  showtimes: {
    dates: { type: [String], required: true },
    times: { 
      type: Map, 
      of: [String], 
      required: true 
    }
  }
});

module.exports = mongoose.model('Movie', movieSchema);
