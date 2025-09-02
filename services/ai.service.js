import { GoogleGenAI } from "@google/genai";
import { prompt } from "./prompt.js"
import { readFile } from "fs/promises"
import "dotenv/config"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.log("No Gemini API key");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
    let text;
    try{
        text = await readFile("./testText/test.txt" , "utf8");
    }catch(err){
        console.log("Error in reading file");
        return;
    }

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${prompt} : ${text}`,
    });
    let tasks;
    try{
        // console.log(response.text);
        let cleaned = response.text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        tasks = JSON.parse(cleaned);
    }catch(err){
        console.log("Error in parsing gemini response");
    }
    console.log(tasks);
}

await main();