import { generateTasks } from "../services/ai.service.js"
import { insertTask } from "../models/tasks.model.js";
import { insertText } from "../models/text.models.js";
import { getUserByUsername } from "../models/users.model.js";

export async function taskFile(req, resp, next) {

    if (!req.file) {
        const err = new Error("No file found");
        err.status = 404;
        throw err;
    }

    const text = req.file.buffer.toString("utf8");
    console.log(text);

    if(!text){
        throw new Error("No text parsed");
    }

    const id = await insertText(text);

    if(typeof id !== "number"){
        const err = new Error("Error in inserting the parsed text");
        throw err;
    }
    const tasks = await generateTasks(text);
    if(tasks === undefined){
        throw new Error("Tasks not generated ");
    }

    // console.log(tasks);
    let result;
    for (const task of tasks) {
        const assigned_to_id = await getUserByUsername(task.assigned_to);
        if(!assigned_to_id) continue;
       try{
         result = await insertTask(id, assigned_to_id, task.title, task.description, task.due_date);
       }catch(err){
        console.log(err)
       }
    }

    if(!result){
        throw new Error("Tasks not inserted ")
    }
    
    return resp.status(201).json({
        success: true,
        message: "Inserted all tasks"
    })
}