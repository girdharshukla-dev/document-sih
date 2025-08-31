CREATE TABLE cookies(
    session_iD UUID PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)