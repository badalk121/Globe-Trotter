import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ItineraryPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/itineraries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItineraries(data);
    };

    fetchItineraries();
  }, []);

  const joinRoom = (id) => {
    setActiveRoom(id);
    socket.emit('joinRoom', id);
  };

  const handleUpdate = (update) => {
    socket.emit('updateItinerary', { roomId: activeRoom, update });
  };

  socket.on('itineraryUpdated', (update) => {
    console.log('Update received:', update);
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Itineraries</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {itineraries.map((itinerary) => (
          <div
            key={itinerary._id}
            className="p-4 border rounded shadow hover:shadow-lg"
            onClick={() => joinRoom(itinerary._id)}
          >
            <h2 className="text-lg font-bold">{itinerary.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryPage;
