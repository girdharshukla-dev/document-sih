import { getAllTasksFromDb } from "../models/tasks.model.js"

export async function getAllTasks(req,resp,next){
    const tasks = await getAllTasksFromDb();
    if(!tasks){
        err = new Error("No tasks found");
        err.status = 404;
        throw err;
    }
    // console.log(tasks);
    return resp.status(200).json(tasks);
}