const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in user' });
    }
};

module.exports = { registerUser, loginUser };
