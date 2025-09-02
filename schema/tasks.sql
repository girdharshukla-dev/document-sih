CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    text_id INTEGER NOT NULL,
    assigned_to INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL, 
    description text,
    status VARCHAR(50) DEFAULT 'pending',
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (text_id) REFERENCES text_data(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE CASCADE
)