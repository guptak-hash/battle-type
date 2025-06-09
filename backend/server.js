require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserRouter = require('./routes/user.routes');
const connectDB = require('./config/db');
const scoreRouter = require('./routes/scoreRoutes');

const app = express();

// Basic CORS configuration
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', UserRouter);
app.use('/api/score', scoreRouter);

// Test route
app.use('/test', (req, res) => {
    try {
        res.send('This is a test route');
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Something went wrong' });
    }
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({ msg: 'Route not found' });
});

const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, async () => {
    try {
        await connectDB(); // mongodb connection
        console.log('Server started at port', PORT);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
});