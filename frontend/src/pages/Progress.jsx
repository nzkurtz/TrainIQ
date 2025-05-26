import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Progress() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/workouts')
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

  const volumeByDate = {};

  workouts.forEach(w => {
    const date = w.date.split('T')[0]; // "YYYY-MM-DD"
    const total = w.exercises.reduce((sum, ex) => {
      const sets = parseInt(ex.sets) || 0;
      const reps = parseInt(ex.reps) || 0;
      const weight = parseFloat(ex.weight) || 0;
      return sum + sets * reps * weight;
    }, 0);

    volumeByDate[date] = (volumeByDate[date] || 0) + total;
  });

  const sortedDates = Object.keys(volumeByDate).sort();

  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Total Volume (lbs)',
        data: sortedDates.map(date => volumeByDate[date]),
        fill: false,
        borderColor: '#00c897',
        tension: 0.3,
      },
    ],
  };

  const [selectedExercise, setSelectedExercise] = useState('');

  const allExercises = Array.from(
    new Set(workouts.flatMap(w => w.exercises.map(ex => ex.name).filter(Boolean)))
  );

  const maxByDate = {};

if (selectedExercise) {
  workouts.forEach(w => {
    const date = w.date.split('T')[0];

    const maxForDay = w.exercises
      .filter(ex => ex.name === selectedExercise)
      .reduce((max, ex) => {
        const weight = parseFloat(ex.weight) || 0;
        return weight > max ? weight : max;
      }, 0);

    if (maxForDay > 0) {
      maxByDate[date] = Math.max(maxByDate[date] || 0, maxForDay);
    }
  });
}

const sortedPRDates = Object.keys(maxByDate).sort();

const prChartData = {
    labels: sortedPRDates,
    datasets: [
      {
        label: `${selectedExercise} – Max Weight`,
        data: sortedPRDates.map(date => maxByDate[date]),
        fill: false,
        borderColor: '#ffa726',
        tension: 0.3,
      },
    ],
  };  

  
  return (
    <div>
      <h2>Progress</h2>
      <div className="chart-section">
        <div className="chart-container">
          <h3>Workout Volume Over Time</h3>
          {sortedDates.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p>No workouts to show yet.</p>
          )}
        </div>

        <div className="chart-container">
          <h3>Personal Records by Exercise</h3>
          <label>Select an Exercise: </label>
          <select
            value={selectedExercise}
            onChange={e => setSelectedExercise(e.target.value)}
          >
            <option value="">-- Choose Exercise --</option>
            {allExercises.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>

          {selectedExercise && sortedPRDates.length > 0 ? (
            <Line data={prChartData} />
          ) : selectedExercise ? (
            <p>No records for this exercise yet.</p>
          ) : null}
        </div>
      </div>

    </div>

  );
}
