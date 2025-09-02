import { pool } from "../dbConnection.js";

/**
 * 
 * @param {number} text_id 
 * @param {number} assigned_to 
 * @param {string} title 
 * @param {string} description 
 * @returns {number}
 */
export async function insertTask(text_id , assigned_to , title , description , due_date){
    const result = await pool.query(
        `INSERT INTO tasks(text_id , assigned_to , title , description , due_date) VALUES($1,$2,$3,$4,$5)`,
        [text_id , assigned_to , title , description , due_date]
    )
    return result.rowCount;
}