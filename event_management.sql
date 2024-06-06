CREATE DATABASE event_management;

USE event_management;

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_date_time DATETIME NOT NULL,
    event_location_address VARCHAR(255) NULL,
    event_location_city VARCHAR(100) NULL,
    event_location_state VARCHAR(100) NULL,
    event_location_zip_code VARCHAR(20) NULL,
    event_duration VARCHAR(100) NULL,
    organizer_name VARCHAR(255) NULL,
    organizer_email VARCHAR(255) NULL,
    event_description TEXT NULL,
    event_type VARCHAR(100) NULL,
    target_audience VARCHAR(255) NULL,
    expected_attendance INT DEFAULT 0,
    keynote_speakers TEXT NULL,
    agenda_schedule TEXT NULL,
    special_guests TEXT NULL,
    budget DECIMAL(10, 2) DEFAULT 0.00,
    event_website_url VARCHAR(255) NULL,
    social_media_links TEXT NULL,
    has_promotional_images BOOLEAN NULL,
    event_hashtag VARCHAR(100) NULL,
    preferred_media_coverage TEXT NULL,
    has_press_kit BOOLEAN NULL,
    interview_availability TEXT NULL,
    additional_notes_for_media TEXT NULL
);

CREATE TABLE event_details (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    detail TEXT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
