require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')
const connectDB = require('./functions/connectDB.js');

// defining the express app and PORT
const app = express();
const PORT = process.env.PORT || 8080;

// defining middleware
app.use(express.json());
app.use(cors());

// making all the image folders accessable to web browsers for accessing images
app.use('/images/client-images', express.static(path.join(__dirname, 'images/client-images')));

// importing the routes 
const client = require('./routes/client.js');

// setting up routes
app.use('/client', client);

// calling the connectDB function and listening server in then block
connectDB(process.env.DATABASE_URI).then(() => {
  // listening server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
