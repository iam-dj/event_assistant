require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

// Set up MySQL connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve list.html at the /list route
app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'list.html'));
});

// Serve event_details.html at the /event_details route
app.get('/event_details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'event_details.html'));
});

// Serve update_event.html at the /update_event route
app.get('/update_event.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update_event.html'));
});

// Endpoint to add events
app.post('/add_event', (req, res) => {
    const {
        event_name, event_date_time, event_location_address, event_location_city, event_location_state, event_location_zip_code, event_duration,
        organizer_name, organizer_email, event_description, event_type, target_audience, expected_attendance = 0, keynote_speakers, agenda_schedule,
        special_guests, budget = 0.00, event_website_url, social_media_links, has_promotional_images, event_hashtag, preferred_media_coverage, has_press_kit,
        interview_availability, additional_notes_for_media
    } = req.body;

    // Check for required fields
    if (!event_name || !event_date_time) {
        return res.status(400).send('Event Name and Event Date and Time are required');
    }

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
        res.redirect('/list'); // Redirect to the list page after adding an event
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

// Endpoint to get a specific event by ID
app.get('/event/:id', (req, res) => {
    const sql = 'SELECT * FROM events WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).send('Event not found');
        }
        res.json(results[0]);
    });
});

// Endpoint to delete a specific event by ID
app.delete('/delete_event/:id', (req, res) => {
    const sql = 'DELETE FROM events WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Endpoint to update a specific event by ID
app.put('/update_event/:id', (req, res) => {
    const {
        event_name, event_date_time, event_location_address, event_location_city, event_location_state, event_location_zip_code, event_duration,
        organizer_name, organizer_email, event_description, event_type, target_audience, expected_attendance = 0, keynote_speakers, agenda_schedule,
        special_guests, budget = 0.00, event_website_url, social_media_links, has_promotional_images, event_hashtag, preferred_media_coverage, has_press_kit,
        interview_availability, additional_notes_for_media
    } = req.body;

    const sql = `UPDATE events SET
        event_name = ?, event_date_time = ?, event_location_address = ?, event_location_city = ?, event_location_state = ?, event_location_zip_code = ?, event_duration = ?,
        organizer_name = ?, organizer_email = ?, event_description = ?, event_type = ?, target_audience = ?, expected_attendance = ?, keynote_speakers = ?, agenda_schedule = ?,
        special_guests = ?, budget = ?, event_website_url = ?, social_media_links = ?, has_promotional_images = ?, event_hashtag = ?, preferred_media_coverage = ?, has_press_kit = ?,
        interview_availability = ?, additional_notes_for_media = ?
        WHERE id = ?`;

    db.query(sql, [
        event_name, event_date_time, event_location_address, event_location_city, event_location_state, event_location_zip_code, event_duration,
        organizer_name, organizer_email, event_description, event_type, target_audience, expected_attendance, keynote_speakers, agenda_schedule,
        special_guests, budget, event_website_url, social_media_links, has_promotional_images === 'on', event_hashtag, preferred_media_coverage, has_press_kit === 'on',
        interview_availability, additional_notes_for_media, req.params.id
    ], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
