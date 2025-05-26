import React, { useState, useEffect } from 'react';

export default function Log() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', weight: '' }]);
  const [notes, setNotes] = useState('');
  const [workouts, setWorkouts] = useState([]); // for displaying all workouts
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch existing workouts
  useEffect(() => {
    fetch('http://localhost:5000/api/workouts')
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

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
    const updatedWorkout = { title, exercises, notes, date };
  
    try {
      let res;
  
      if (isEditing) {
        res = await fetch(`http://localhost:5000/api/workouts/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedWorkout)
        });
      } else {
        res = await fetch('http://localhost:5000/api/workouts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedWorkout)
        });
      }
  
      if (!res.ok) throw new Error('Failed to submit workout');
  
      const data = await res.json();
  
      if (isEditing) {
        setWorkouts(workouts.map(w => (w.id === editingId ? data : w)));
        alert('Workout updated!');
      } else {
        setWorkouts([data, ...workouts]);
        alert('Workout logged!');
      }
  
      // Clear form
      setTitle('');
      setNotes('');
      setDate('');
      setExercises([{ name: '', sets: '', reps: '', weight: '' }]);
      setIsEditing(false);
      setEditingId(null);
  
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };
  

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setWorkouts(workouts.filter(w => w.id !== id));
    } else {
      alert('Failed to delete workout.');
    }
  };

  const startEdit = (workout) => {
    setTitle(workout.title);
    setNotes(workout.notes);
    setDate(workout.date);
    setExercises(workout.exercises);
    setIsEditing(true);
    setEditingId(workout.id);
  };
  
  return (
    <div>
      <h2>Log a Workout</h2>
      <form className="workout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
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

        <button type="submit">{isEditing ? 'Update Workout' : 'Log Workout'}</button>
      </form>

      <hr />

      <h3>Logged Workouts</h3>
      {workouts.length === 0 ? (
        <p>No workouts yet.</p>
      ) : (
        workouts.map((w) => (
          <div key={w.id} className="workout-card">
            <h4>
              {w.title} — {new Date(w.date).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </h4>
            <ul>
              {w.exercises.map((ex, i) => (
                <li key={i}>
                  {ex.name}: {ex.sets}x{ex.reps} reps @ {ex.weight} lbs
                </li>
              ))}
            </ul>
            {w.notes && <p><i>Notes:</i> {w.notes}</p>}
            <button onClick={() => startEdit(w)}>Edit</button>
            <button onClick={() => handleDelete(w.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
