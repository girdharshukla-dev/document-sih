import { pool } from "../dbConnection.js";

/**
 * 
 * @param {number} text_id 
 * @param {number} assigned_to 
 * @param {string} title 
 * @param {string} description 
 * @returns {number}
 */
export async function insertTask(text_id, assigned_to, title, description, due_date) {
    const result = await pool.query(
        `INSERT INTO tasks(text_id , assigned_to , title , description , due_date) VALUES($1,$2,$3,$4,$5)`,
        [text_id, assigned_to, title, description, due_date]
    )
    return result.rowCount;
}

export async function getTaskFromDbByEmail(email){
    const result = await pool.query(
        `SELECT 
            t.id,
            t.text_id,
            t.assigned_to,
            u.username AS assigned_to_name,
            t.title,
            t.description,
            t.status,
            t.due_date,
            t.created_at,
            t.updated_at
        FROM tasks t
        JOIN users u ON t.assigned_to = u.id WHERE u.email=$1;`,
        [email]
    )
    return result.rows;
}


export async function getAllTasksFromDb() {
    const result = await pool.query(
        `SELECT 
            t.id,
            t.text_id,
            t.assigned_to,
            u.username AS assigned_to_name,
            t.title,
            t.description,
            t.status,
            t.due_date,
            t.created_at,
            t.updated_at
        FROM tasks t
        JOIN users u ON t.assigned_to = u.id;`
    );
    // console.log(result.rows);
    return result.rows;
}