const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: String,
  sets: String,
  reps: String,
  weight: String,
});

const WorkoutSchema = new mongoose.Schema({
  title: String,
  exercises: [ExerciseSchema],
  notes: String,
  date: String, // keep as string for now since that's what you're storing
});

module.exports = mongoose.model('Workout', WorkoutSchema);
