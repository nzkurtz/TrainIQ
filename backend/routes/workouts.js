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
  

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    workouts = workouts.filter(w => w.id !== id);
    res.json({ message: `Workout ${id} deleted.` });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedWorkout = req.body;

    const index = workouts.findIndex(w => w.id === id);
    if (index !== -1) {
        workouts[index] = { ...updatedWorkout, id }; // preserve ID
        return res.json(workouts[index]);
    }

    res.status(404).json({ message: 'Workout not found' });
});
  

module.exports = router;
