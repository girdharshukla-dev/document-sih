import express from "express"
import dotenv from "dotenv"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"
import { asyncHandler } from "./middlewares/asyncHandler.middleware.js"
import { userRouter } from "./routers/users.router.js"
import cookieParser from "cookie-parser"
import { taskRouter } from "./routers/text.router.js"
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(express.json())
app.use(cookieParser())

app.get("/health" , (req , resp)=>{
    console.log("Something hit the health ");
    return resp.json({message : "OK"});
})

app.get("/check" , asyncHandler((req,resp)=>{
    throw new Error("Something iss wrong")
}))

app.use("/user" , userRouter);
app.use("/task" , taskRouter);

app.use(errorHandler)

app.listen(PORT , ()=>{
    console.log(">Server started at port : " , PORT);
})