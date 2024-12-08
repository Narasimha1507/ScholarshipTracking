const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Configure session
app.use(session({
    secret: 'your_secret_key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // Session expires after 1 minute
}));

// Route to set session
app.post('/login', (req, res) => {
    const { username } = req.body;

    if (username) {
        req.session.username = username;
        res.status(200).send({ message: `Session created for user: ${username}` });
    } else {
        res.status(400).send({ error: 'Username is required' });
    }
});

// Route to get session
app.get('/profile', (req, res) => {
    if (req.session.username) {
        res.status(200).send({ message: `Welcome, ${req.session.username}` });
    } else {
        res.status(401).send({ error: 'No active session. Please log in.' });
    }
});

// Route to destroy session
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send({ error: 'Failed to log out' });
        } else {
            res.status(200).send({ message: 'Logged out successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
