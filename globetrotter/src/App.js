import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ItineraryPage from './pages/ItineraryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/itineraries" element={<ItineraryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
