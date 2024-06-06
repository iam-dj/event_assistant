const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'event_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your HTML form)
app.use(express.static('public'));

// Endpoint to add events
app.post('/add_event', (req, res) => {
    const {
        event_name, event_date_time, event_location_address, event_location_city, event_location_state, event_location_zip_code, event_duration,
        organizer_name, organizer_email, event_description, event_type, target_audience, expected_attendance, keynote_speakers, agenda_schedule,
        special_guests, budget, event_website_url, social_media_links, has_promotional_images, event_hashtag, preferred_media_coverage, has_press_kit,
        interview_availability, additional_notes_for_media
    } = req.body;

    const sql = `INSERT INTO events (
        event_name, event_date_time, event_location_address, event_location_city, event_location_state, event_location_zip_code, event_duration,
        organizer_name, organizer_email, event_description, event_type, target_audience, expected_attendance, keynote_speakers, agenda_schedule,
        special_guests, budget, event_website_url, social_media_links, has_promotional_images, event_hashtag, preferred_media_coverage, has_press_kit,
        interview_availability, additional_notes_for_media
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        event_name, event_date_time, event_location_address, event_location_city, event_location_state, event_location_zip_code, event_duration,
        organizer_name, organizer_email, event_description, event_type, target_audience, expected_attendance, keynote_speakers, agenda_schedule,
        special_guests, budget, event_website_url, social_media_links, has_promotional_images === 'on', event_hashtag, preferred_media_coverage, has_press_kit === 'on',
        interview_availability, additional_notes_for_media
    ], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Endpoint to get events
app.get('/events', (req, res) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
