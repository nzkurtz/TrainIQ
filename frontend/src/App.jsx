import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Log from './pages/Log';
import Progress from './pages/Progress';
import './index.css';

function App() {
  return (
    <Router>
      <nav>
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/log">Log</Link>
            <Link to="/progress">Progress</Link>
          </div>
          <div className="nav-right">
            TrainIQ
          </div>
        </div>
      </nav>


      <div className="container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/log" element={<Log />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </div>

      

    </Router>



  );
}

export default App;
