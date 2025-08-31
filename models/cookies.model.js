import {pool} from "../dbConnection.js"

/**
 * 
 * @param {string} session_id 
 * @param {number} user_id 
 */
export async function insertCookie(session_id , user_id){
    const result = await pool.query(
        `INSERT INTO cookies(session_id , user_id) VALUES($1,$2) RETURNING session_id`,
        [session_id , user_id]
    );
    return result.rows[0].session_id;
}

/**
 * 
 * @param {string} session_id 
 * @returns {Promise<number|null>}
 */
export async function getUserFromCookie(session_id){
    const result = await pool.query(
        `SELECT user_id FROM cookies WHERE session_id=$1`,[session_id]
    );
    return result.rows[0]?.user_id || null;
}