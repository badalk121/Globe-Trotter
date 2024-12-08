const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Real-time collaboration
    schedule: { type: Array, default: [] }, // Drag-and-drop items
    budget: {
        total: { type: Number, default: 0 },
        spent: { type: Number, default: 0 },
    },
    destinationInsights: { type: Object }, // For AI-powered suggestions
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
