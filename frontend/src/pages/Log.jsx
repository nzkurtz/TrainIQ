import React, { useState } from 'react';

export default function Log() {
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', weight: '' }]);
  const [notes, setNotes] = useState('');

  const handleExerciseChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkout = { title, exercises, notes, date: new Date().toISOString() };

    const res = await fetch('http://localhost:5000/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWorkout)
    });

    if (res.ok) {
      alert('Workout logged!');
      setTitle('');
      setNotes('');
      setExercises([{ name: '', sets: '', reps: '', weight: '' }]);
    } else {
      alert('Failed to log workout');
    }
  };

  return (
    <div>
      <h2>Log a Workout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />

        {exercises.map((ex, i) => (
          <div key={i}>
            <input
              type="text"
              placeholder="Exercise"
              value={ex.name}
              onChange={(e) => handleExerciseChange(i, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Sets"
              value={ex.sets}
              onChange={(e) => handleExerciseChange(i, 'sets', e.target.value)}
            />
            <input
              type="number"
              placeholder="Reps"
              value={ex.reps}
              onChange={(e) => handleExerciseChange(i, 'reps', e.target.value)}
            />
            <input
              type="number"
              placeholder="Weight"
              value={ex.weight}
              onChange={(e) => handleExerciseChange(i, 'weight', e.target.value)}
            />
          </div>
        ))}

        <button type="button" onClick={addExercise}>+ Add Exercise</button><br />

        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        /><br />

        <button type="submit">Log Workout</button>
      </form>
    </div>
  );
}
