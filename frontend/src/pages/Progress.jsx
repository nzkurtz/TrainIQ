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

  return (
    <div>
      <h2>Progress</h2>
      <h3>Workout Volume Over Time</h3>
      {sortedDates.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No workouts to show yet.</p>
      )}
    </div>
  );
}
