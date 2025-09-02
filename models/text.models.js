import {pool} from "../dbConnection.js";

/**
 * @param {string} text
 * @returns {number}
 */
export async function insertText(text){
    const result = await pool.query(
        `INSERT INTO text_data(text) VALUES($1) RETURNING id`,[text]
    );
    return result.rows[0].id;
}