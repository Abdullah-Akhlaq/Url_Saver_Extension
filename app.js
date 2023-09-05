const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/url-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

const urlSchema = new mongoose.Schema({
    url: String, // Change from 'message' to 'url'
    dateCreated: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlSchema);

// Create a new URL entry
app.post('/api/entries', async (req, res) => {
    const { url } = req.body;

    try {
        const newUrl = new Url({ url });
        await newUrl.save();
        res.status(201).json(newUrl);
    } catch (error) {
        console.error('Error saving URL:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
