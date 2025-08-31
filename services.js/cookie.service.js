import { v4 } from "uuid";
import { insertCookie } from "../models/cookies.model.js"
/**
 * 
 * @param {number} user_id 
 * @returns {string}
 */
export async function createCookie(user_id){
    const uuid = v4();
    const ans = await insertCookie(uuid , user_id);
    if(!ans){
        const err = new Error("Error in insertnig cookies");
        err.status = 500;
        throw err;
    }
    return ans;
}