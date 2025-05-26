const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

let workouts = [];

// GET all workouts
router.get('/', async (req, res) => {
    try {
      const workouts = await Workout.find().sort({ date: 1 });
      res.json(workouts);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch workouts' });
    }
});
  
  // POST a new workout
  router.post('/', async (req, res) => {
    try {
      const workout = new Workout(req.body);
      const saved = await workout.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ message: 'Failed to save workout' });
    }
});
  
// DELETE a workout
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Workout.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json({ message: `Workout ${id} deleted.` });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete workout' });
  }
});


// UPDATE a workout
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,         // return updated document
      runValidators: true,
    });

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json(updatedWorkout);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update workout' });
  }
});

  

module.exports = router;
