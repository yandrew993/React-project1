const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection Configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'App' // Change this to your database name
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route for submitting form data
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Insert form data into the database
    connection.query('INSERT INTO myapp SET ?', formData, (error, results, fields) => {
        if (error) {
            console.error('Error submitting form data:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Form data submitted successfully');
        res.send('Form data submitted successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
