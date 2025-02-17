-- Active: 1738333306087@@127.0.0.1@3306@challenge
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    login_count INT DEFAULT 0,
    last_login_at TIMESTAMP DEFAULT NULL, 
    verified_at TIMESTAMP DEFAULT NULL
);


CREATE INDEX idx_users_created_at ON users (created_at);


CREATE INDEX idx_users_last_login ON users (last_login_at);

