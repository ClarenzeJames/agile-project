
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS friendships (
    friendship_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id_one INT NOT NULL,
    user_id_two INT NOT NULL,
    friend_status TEXT NOT NULL,
    FOREIGN KEY (user_id_one) REFERENCES users(user_id),
    FOREIGN KEY (user_id_two) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS user_favourites (
    favourites_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT NOT NULL,
    favourites JSON,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS shows (
    show_id INTEGER PRIMARY KEY AUTOINCREMENT,
    likes INTEGER
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    show_id INTEGER NOT NULL,
    comment_text TEXT NOT NULL,
    FOREIGN KEY (show_id) REFERENCES shows(show_id)
);

-- Insert default data (if necessary here)

-- Set up three users
INSERT INTO users ('user_name','user_email','user_password') VALUES ('Simon Star','simonStar@mail.com','password');
INSERT INTO user_favourites('user_id','favourites') VALUES (1,'[533535,1022789, 519182, 573435, 365177, 1160018]');
-- INSERT INTO users ('user_name','user_password') VALUES ('John Bob','password');
-- INSERT INTO users ('user_name','user_password') VALUES ('Steven Perry','password');

-- Give Simon two email addresses and Diane one, but Harry has none
-- INSERT INTO email_accounts ('email_address', 'user_id') VALUES ('simon@gmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'user_id') VALUES ('simon@hotmail.com', 1); 
-- INSERT INTO email_accounts ('email_address', 'user_id') VALUES ('dianne@yahoo.co.uk', 2); 

COMMIT;

