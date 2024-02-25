const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI;

// Function to connect to the database
const connectToDatabase = () => {
    mongoose.connect(DB_URI);

    const db = mongoose.connection;

    // Event listener for connection errors
    db.on('error', function (error) {
        console.error('MongoDB connection error:', error.message);
        // Attempt to restart the process
        console.log('restarting the server')
        startServer();
    });

    // Event listener for when the connection is closed
    mongoose.connection.on('disconnected', function () {
        console.log('MongoDB connection disconnected');
    });

    // Event listener for handling SIGINT (Ctrl+C) to close the connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('MongoDB connection disconnected through app termination');
            process.exit(0);
        });
    });
};

// Function to start the server
const startServer = () => {
    try {
        // Add a generic error handler for uncaught exceptions
        process.on('uncaughtException', (error) => {
            console.error('Uncaught Exception:', error.message);
            // Attempt to restart the process
            startServer();
        });

        // Connect to the database
        connectToDatabase();

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

// Start the server
startServer();

module.exports = mongoose.connection;
