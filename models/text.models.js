import {pool} from "../dbConnection.js";

/**
 * @param {string} text
 * @returns {number}
 */
export async function insertText(text){
    const result = await pool.query(
        `INSERT INTO full_text(text) VALUES($1)`,[text]
    );
    return result.rowCount;
}