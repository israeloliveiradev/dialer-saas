require('dotenv').config();
const express = require('express');
const healthRoutes = require('./routes/health');
const { initializeDatabase } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/health', healthRoutes);

// Start the server
const startServer = async () => {
    try {
        // await initializeDatabase(); // Moved to models/index.js
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};
startServer();