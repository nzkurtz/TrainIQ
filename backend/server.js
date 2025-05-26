const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const workoutRoutes = require('./routes/workouts');
app.use('/api/workouts', workoutRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'TrainIQ API running' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
