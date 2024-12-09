import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import './ItineraryPage.css'; // Optional: Add custom styling

const ItineraryPage = () => {
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch itinerary data from backend
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/itinerary`);
        setItinerary(response.data);
      } catch (err) {
        setError('Failed to load itinerary. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(itinerary);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItinerary(items);

    // Update backend with the new order
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/itinerary`, items);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading itinerary...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="itinerary-page">
      <h1 className="page-title">Itinerary Planner</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="itinerary">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="itinerary-container"
            >
              {itinerary.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="itinerary-item"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <h2 className="item-title">{item.title}</h2>
                      <p className="item-description">{item.description}</p>
                      <span className="item-time">{item.time}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ItineraryPage;
