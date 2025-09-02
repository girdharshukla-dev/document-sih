import { taskFile } from "../controllers/taskFile.controller.js";
import multer from "multer";
import express from "express";

export const taskRouter = express.Router();

const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5*1024*1024
    }
})

taskRouter.post("/upload" , upload.single("file") , taskFile)