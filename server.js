require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (your HTML + JS)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/news', async (req, res) => {
    const query = req.query.q || 'India';
    const apiKey = process.env.NEWS_API_KEY;
    const apiUrl = process.env.NEWS_API_URL;

    if (!apiKey || !apiUrl) {
        return res.status(500).json({ error: 'Missing API configuration' });
    }

    const url = `${apiUrl}${encodeURIComponent(query)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error fetching news:', err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
