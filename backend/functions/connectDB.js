const mongoose = require('mongoose');


// function to connect to Oolkar database
const connectDB = async (database) => {
    try {
        console.log("Connecting to Session Database...");
        await mongoose.connect(database)
        console.log("Connected to Session Database")
    } catch (error) {
        console.log("Failed connection to Session Database")
        process.exit(0);
    }
}


module.exports = connectDB;