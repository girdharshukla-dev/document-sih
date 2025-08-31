import express from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js"
import { userRegister } from "../controllers/userRegister.controller.js";
import { userLogin } from "../controllers/userLogin.controller.js"

export const userRouter = express.Router();

userRouter.post("/register" , asyncHandler(userRegister));
userRouter.post("/login" , asyncHandler(userLogin));