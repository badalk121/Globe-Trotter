import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ItineraryScheduler = ({ schedule, onUpdate }) => {
  const [itinerary, setItinerary] = useState(schedule);

  useEffect(() => {
    const savedItinerary = localStorage.getItem('itinerary');
    if (savedItinerary) setItinerary(JSON.parse(savedItinerary));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(itinerary);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItinerary(items);
    localStorage.setItem('itinerary', JSON.stringify(items)); // Save locally
    onUpdate(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="itinerary">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {itinerary.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="p-2 mb-2 bg-white border rounded shadow"
                  >
                    {item.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ItineraryScheduler;
