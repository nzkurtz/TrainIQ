# TrainIQ — Full Stack Workout Tracker

**TrainIQ** is a full-stack workout planning and progress tracking app built with React, Node.js, Express, and MongoDB. It allows users to log workouts, visualize progress over time, and streamline recurring workouts using preset copying — all in a clean, interactive UI.

---

## Features

- **Log workouts** with custom exercises, sets, reps, and weights
- **Edit, delete, or copy** past workouts directly into the form
- **Visualize progress** with dynamic charts (volume + personal records)
- **Dashboard view** with weekly activity heatmap and hover previews
- **Presets feature** via "Copy to Form" for faster reuse
- Full **MongoDB-backed CRUD functionality**
- Frontend built with **React (Vite)** and styled with custom CSS
- REST API built with **Express + Mongoose**

---

## Tech Stack

| Frontend     | Backend         | Database       | Tools         |
|--------------|------------------|----------------|---------------|
| React (Vite) | Node.js, Express | MongoDB, Mongoose | Git, GitHub, Chart.js |

---

## Screenshots

> _(Add screenshots or GIFs here showing the dashboard, log form, and charts)_

---

## Folder Structure

```bash
TrainIQ/
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── index.html
```

---

## Getting Started (Local)

### 1. Clone the repo

```bash
git clone https://github.com/nzkurtz/TrainIQ.git
cd TrainIQ
```

### 2. Set up the backend

```bash
cd backend
npm install
touch .env
```

Add your MongoDB URI to `.env`:
```
MONGO_URI=mongodb://127.0.0.1:27017/trainiq
```

Then run:
```bash
mongod  # in a separate terminal
node server.js
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173)

---

## Author

**Nathan Kurtz**  

---

## Future Features

- User authentication (login/signup)
- Saveable workout templates
- Cloud deployment (MongoDB Atlas + Render/Netlify)

---

## Summary

TrainIQ is a full CRUD fitness tracker built with production-ready tools. While currently hosted locally, it’s designed for easy deployment and future expansion — demonstrating modern full-stack web development in a clean, modular project.
