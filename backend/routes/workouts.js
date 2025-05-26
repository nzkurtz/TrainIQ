const express = require('express');
const router = express.Router();

let workouts = [];

router.get('/', (req, res) => {
  res.json(workouts);
});

router.post('/', (req, res) => {
  const workout = { id: Date.now().toString(), ...req.body };
  workouts.push(workout);
  res.status(201).json(workout);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  workouts = workouts.filter(w => w.id !== id);
  res.json({ message: `Workout ${id} deleted.` });
});

module.exports = router;
