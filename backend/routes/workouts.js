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
