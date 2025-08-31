import { getUserByEmail } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { createCookie } from "../services.js/cookie.service.js";

export const userLogin = async(req , resp , next)=>{
    const {email , password} = req.body;
    if(!email){
        const err = new Error("Email field empty");
        err.status = 404;
        throw err;
    }
    const user = await getUserByEmail(email);
    if(!user){
        const err = new Error("User not exists");
        err.status = 404;
        throw err;
    }
    const matched = await bcrypt.compare(password , user.password);
    if(!matched){
        return resp.status(401).json({
            success : false,
            message : "Incorrect password"
        })
    }else{
        const ans = await createCookie(user.id);
        resp.cookie("session_id" , ans , {
            httpOnly : true,
            secure : process.env.NODE_ENV !== "dev",
            sameSite : "strict",
            maxAge : 1000*24*60*60
        })
        return resp.status(200).json({
            success : true,
            messagae : "Login in successful"
        })
    }
}