import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [hoveredWorkout, setHoveredWorkout] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/workouts')
      .then(res => res.json())
      .then(data => {
        const normalized = data.map(w => ({
          ...w,
          id: w._id || w.id, // ensure we can rely on w.id
        }));
        setWorkouts(normalized);
      });
      
  }, []);

  const getWorkoutForDate = (dateStr) => {
    return workouts.find(w => w.date.startsWith(dateStr));
  };

  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d.toISOString().split('T')[0]; // Format: "YYYY-MM-DD"
    });
  };

  const weekDates = getWeekDates();

  const workoutsByDay = weekDates.map(date =>
    workouts.some(w => w.date.startsWith(date))
  );

  const weeklyWorkouts = workouts.filter(w =>
    weekDates.some(d => w.date.startsWith(d))
  );
  
  const totalWorkouts = weeklyWorkouts.length;
  
  const totalExercises = weeklyWorkouts.reduce((sum, w) => sum + w.exercises.length, 0);
  
  const totalVolume = weeklyWorkouts.reduce((sum, w) => {
    return sum + w.exercises.reduce((exSum, ex) => {
      const sets = parseInt(ex.sets) || 0;
      const reps = parseInt(ex.reps) || 0;
      const weight = parseFloat(ex.weight) || 0;
      return exSum + (sets * reps * weight);
    }, 0);
  }, 0);
  

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="weekly-summary">
        <h3>This Week</h3>
        <p>✔️ <strong>{totalWorkouts}</strong> workouts</p>
        <p>📋 <strong>{totalExercises}</strong> total exercises</p>
        <p>🏋️ <strong>{totalVolume}</strong> lbs lifted</p>
      </div>
      <h3>Workout Activity This Week</h3>

      {/* WEEK STRIP */}
      <div className="week-strip">
        {weekDates.map((date, i) => (
          <div
            key={i}
            className={`day-box ${workoutsByDay[i] ? 'active' : ''}`}
            onMouseEnter={() => {
              const workout = getWorkoutForDate(date);
              setHoveredWorkout(workout);
            }}
            
            onMouseLeave={() => {
              setHoveredWorkout(null); // always clear hover on leave
            }}
            
            
            onClick={() => {
              const workout = getWorkoutForDate(date);
              if (selectedWorkout?.id === workout?.id) {
                setSelectedWorkout(null); // deselect if already selected
              } else {
                setSelectedWorkout(workout); // select this one
              }
            }}
            
            
          >
            <div className="day-label">
              {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]}
            </div>
          </div>
        ))}
      </div>

      {/* WORKOUT PREVIEW BELOW STRIP */}
      {(hoveredWorkout || selectedWorkout) && (
        <div className="workout-preview">
          <h4>{(hoveredWorkout || selectedWorkout).title}</h4>
          <ul>
            {(hoveredWorkout || selectedWorkout).exercises.map((ex, i) => (
              <li key={i}>
                {ex.name || 'Exercise'}: {ex.sets || '?'}x{ex.reps || '?'} @ {ex.weight || '?'} lbs
              </li>
            ))}
          </ul>
          {(hoveredWorkout || selectedWorkout).notes && (
            <p><i>Notes:</i> {(hoveredWorkout || selectedWorkout).notes}</p>
          )}
        </div>
      )}

    </div>
  );
}
