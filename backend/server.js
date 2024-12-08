const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/itineraries', require('./routes/itineraryRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Socket.IO for collaboration
io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on('updateItinerary', (data) => {
        const { roomId, update } = data;
        io.to(roomId).emit('itineraryUpdated', update);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
