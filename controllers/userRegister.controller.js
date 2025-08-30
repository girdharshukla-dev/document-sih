import bcrypt from "bcryptjs";
import {getUserByEmail, insertUser} from "../models/users.model.js"

export const userRegister = async(req,resp,next)=>{
    const {username , email , password } = req.body;
    if(!username || !email || !password){
        const err = new Error("Username , email or password missing ");
        err.status = 400
        throw err;
    }
    const hashed = await bcrypt.hash(password , 10);

    const existingUser = await getUserByEmail(email);
    if(existingUser){
        const err = new Error("User already exists");
        err.status = 409;
        throw err;
    }

    const id = await insertUser({username , email , password : hashed});

    if(typeof id !== "number"){
        const err = new Error("User insertion failed");
        err.status = 400;
        throw err;
    }
    return resp.status(201).json({
        success : true,
        message : "User inserted successfully"
    })
}