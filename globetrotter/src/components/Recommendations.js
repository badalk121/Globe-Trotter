import React, { useState } from 'react';
import axios from '../utils/api';

const Recommendations = ({ location, preferences }) => {
  const [recommendations, setRecommendations] = useState('');

  const fetchRecommendations = async () => {
    try {
      const { data } = await axios.post('/recommendations', {
        location,
        preferences,
      });
      setRecommendations(data.recommendations);
    } catch (error) {
      alert('Error fetching recommendations');
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={fetchRecommendations}
        className="bg-green-500 text-white p-2 rounded"
      >
        Get Recommendations
      </button>
      {recommendations && (
        <div className="mt-2 p-4 bg-gray-100 rounded shadow">
          <h3 className="font-bold">Recommendations:</h3>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
