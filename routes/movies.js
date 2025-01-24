const express = require('express');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().populate('cinema');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('cinema');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/cinema/:cinemaId', async (req, res) => {
  try {
    const movies = await Movie.find({ cinema: req.params.cinemaId }).populate('cinema');
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: 'No movies found for this cinema' });
    }
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      title,
      poster,
      rating,
      releaseDate,
      synopsis,
      cast,
      director,
      writer,
      duration,
      genre,
      cinemaId,
      showtimes
    } = req.body;

    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return res.status(400).json({ message: 'Invalid cinema ID' });
    }

    if (
      !showtimes || 
      !Array.isArray(showtimes.dates) || 
      typeof showtimes.times !== 'object' || 
      Object.keys(showtimes.times).length === 0
    ) {
      return res.status(400).json({ message: 'Invalid showtimes format' });
    }

    const movie = new Movie({
      title,
      poster,
      rating,
      releaseDate,
      synopsis,
      cast,
      director,
      writer,
      duration,
      genre,
      cinema: cinema._id,
      showtimes
    });

    await movie.save();
    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id/showtimes', async (req, res) => {
  try {
    const { showtimes } = req.body;

    if (
      !showtimes || 
      !Array.isArray(showtimes.dates) || 
      typeof showtimes.times !== 'object' || 
      Object.keys(showtimes.times).length === 0
    ) {
      return res.status(400).json({ message: 'Invalid showtimes format' });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    movie.showtimes = showtimes;
    await movie.save();

    res.json({ message: 'Showtimes updated successfully', movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
