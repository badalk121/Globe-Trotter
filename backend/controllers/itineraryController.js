const Itinerary = require('../models/Itinerary');

const createItinerary = async (req, res) => {
    const { title, schedule, budget, destinationInsights } = req.body;

    try {
        const newItinerary = new Itinerary({
            title,
            schedule,
            budget,
            destinationInsights,
            creator: req.user.id,
        });
        await newItinerary.save();

        res.status(201).json(newItinerary);
    } catch (err) {
        res.status(500).json({ message: 'Error creating itinerary' });
    }
};

const getItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ creator: req.user.id });
        res.status(200).json(itineraries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching itineraries' });
    }
};

module.exports = { createItinerary, getItineraries };
