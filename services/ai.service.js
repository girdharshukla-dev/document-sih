import { GoogleGenAI } from "@google/genai";
import { prompt } from "./prompt.js"
import { readFile } from "fs/promises"
import "dotenv/config"
import { getAllUsers } from "../models/users.model.js"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.log("No Gemini API key");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * 
 * @param {string} text 
 * @returns {Array<Object>}
 */
export async function generateTasks(text) {
    // console.log("REACHED IN GENERATE TASKS")
    const users = getAllUsers();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${prompt} : ${text}`,
    }); 
    let tasks;
    try {
        // console.log(response.text);
        let cleaned = response.text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        tasks = JSON.parse(cleaned);
    } catch (err) {
        console.log("Error in parsing gemini response");
    }
    // console.log("COMPLETED TASK CREATION")
    console.log(tasks);
    return tasks;
}