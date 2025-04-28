CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    offering_skill VARCHAR(100) NOT NULL,
    requested_skill VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE users_profile(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skills VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    availability VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE SET NULL
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

CREATE TABLE conversation_participants (
    conversation_id INT NOT NULL,
    user_id INT NOT NULL,
    unread_count INT DEFAULT 0,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (conversation_id, user_id),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
);
-- -- Create index for faster queries
-- CREATE INDEX idx_post_id ON comments(post_id);
-- CREATE INDEX idx_user_id_posts ON posts(user_id);
-- CREATE INDEX idx_user_id_comments ON comments(user_id);
-- CREATE INDEX idx_category ON posts(category);
-- CREATE INDEX idx_skills ON posts(offering_skill, requested_skill);