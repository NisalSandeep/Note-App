const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const notesRoutes = require('./routes/notes-routes');


const  app =  express();

app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies


mongoose.connect('mongodb://localhost:27017/notesDB').then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.use('/api/notes', notesRoutes);


app.listen(5000, () => {
    console.log('Server is running on port http://localhost:5000');
});

