const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Welcome to Big Company! Choose a location to view its page.');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});