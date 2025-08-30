import express from "express";
import {asyncHandler} from "../middlewares/asyncHandler.middleware.js"
import { userRegister } from "../controllers/userRegister.controller.js";

export const userRouter = express.Router();
userRouter.post("/register" , asyncHandler(userRegister));
