const express = require('express');
const router = express.Router();

// Placeholder for analytics APIs
router.get('/expense-trends', (req, res) => {
    res.status(200).json({ message: 'Expense trends data' });
});

module.exports = router;
