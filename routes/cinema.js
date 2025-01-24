const express = require('express');
const Cinema = require('../models/Cinema');
const Movie = require('../models/Movie'); 
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const cinemas = await Cinema.find().populate('movies');
    res.json(cinemas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id).populate('movies');
    if (!cinema) {
      return res.status(404).json({ message: 'Cinema not found' });
    }
    res.json(cinema);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, location, capacity, seats, movies, price } = req.body;

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: 'Invalid price value' });
    }

    const cinema = new Cinema({ name, location, capacity, seats, movies, price });

    if (movies && movies.length > 0) {
      const existingMovies = await Movie.find({ _id: { $in: movies } });
      if (existingMovies.length !== movies.length) {
        return res.status(400).json({ message: 'One or more movie IDs are invalid' });
      }
    }

    await cinema.save();
    res.status(201).json({ message: 'Cinema added successfully', cinema });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, location, capacity, seats, movies, price } = req.body;

    if (price && (typeof price !== 'number' || price <= 0)) {
      return res.status(400).json({ message: 'Invalid price value' });
    }

    const updatedCinema = await Cinema.findByIdAndUpdate(
      req.params.id,
      { name, location, capacity, seats, movies, price },
      { new: true }
    ).populate('movies');

    if (!updatedCinema) {
      return res.status(404).json({ message: 'Cinema not found' });
    }

    res.json({ message: 'Cinema updated successfully', cinema: updatedCinema });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCinema = await Cinema.findByIdAndDelete(req.params.id);
    if (!deletedCinema) {
      return res.status(404).json({ message: 'Cinema not found' });
    }
    res.json({ message: 'Cinema deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
