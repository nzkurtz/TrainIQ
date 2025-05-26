const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const workoutRoutes = require('./routes/workouts');
app.use('/api/workouts', workoutRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'TrainIQ API running' });
});

mongoose.connect('mongodb://127.0.0.1:27017/trainiq', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
