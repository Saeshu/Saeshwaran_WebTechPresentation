const express = require('express');
const app = express();
const path = require('path');

// Store votes in memory (for simplicity, not persistent)
let yesVotes = 0;
let noVotes = 0;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// API to handle voting
app.post('/vote', (req, res) => {
    const { vote } = req.query; // Get vote from query string (yes/no)

    if (vote === 'yes') {
        yesVotes++;
    } else if (vote === 'no') {
        noVotes++;
    }

    // Return updated vote counts as JSON
    res.json({ yesVotes, noVotes });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
