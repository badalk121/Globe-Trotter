const express = require('express');
const { createItinerary, getItineraries } = require('../controllers/itineraryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createItinerary);
router.get('/', authMiddleware, getItineraries);

module.exports = router;
