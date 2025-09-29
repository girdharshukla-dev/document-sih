import { getAllTasksFromDb, getTaskFromDbByEmail } from "../models/tasks.model.js"

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


export async function getTaskByEmail(req,resp,next){
    const email = req.params.email;
    const tasks = await getTaskFromDbByEmail(email);
    if(!tasks){
        err = new Error("No tasks found");
        err.status = 400;
        throw err;
    }
    return resp.status(200).json(tasks);
}