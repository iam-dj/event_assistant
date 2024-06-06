CREATE DATABASE event_management;

USE event_management;

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_date_time DATETIME NOT NULL,
    event_location_address VARCHAR(255),
    event_location_city VARCHAR(100),
    event_location_state VARCHAR(100),
    event_location_zip_code VARCHAR(20),
    event_duration VARCHAR(100),
    organizer_name VARCHAR(255),
    organizer_email VARCHAR(255),
    event_description TEXT,
    event_type VARCHAR(100),
    target_audience VARCHAR(255),
    expected_attendance INT,
    keynote_speakers TEXT,
    agenda_schedule TEXT,
    special_guests TEXT,
    budget DECIMAL(10, 2),
    event_website_url VARCHAR(255),
    social_media_links TEXT,
    has_promotional_images BOOLEAN,
    event_hashtag VARCHAR(100),
    preferred_media_coverage TEXT,
    has_press_kit BOOLEAN,
    interview_availability TEXT,
    additional_notes_for_media TEXT
);
