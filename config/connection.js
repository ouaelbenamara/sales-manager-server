const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI;

// Add a generic error handler for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.message);
    process.exit(1); // Exit with a non-zero code to indicate an error
});

// Use a try-catch block to handle connection errors
try {
    mongoose.connect(DB_URI);

    const db = mongoose.connection;
    db.on('error', function (error) {
        console.error('MongoDB connection error:', error.message);
    });






    // Additional event listener for when the connection is closed
    mongoose.connection.on('disconnected', function () {
        console.log('MongoDB connection disconnected');
    });

    // Additional event listener for handling SIGINT (Ctrl+C) to close the connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('MongoDB connection disconnected through app termination');
            process.exit(0);
        });
    });

} catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
}
module.exports = mongoose.connection;
