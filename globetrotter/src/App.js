import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ItineraryPage from './pages/ItineraryPage';
import Notification from './components/Notification';

const App = () => {
  return (
    <Router>
      <Notification />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/itineraries" element={<ItineraryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
