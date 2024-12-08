const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};

module.exports = { getNotifications };
