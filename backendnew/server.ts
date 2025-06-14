
import express from "express";

import type { Request, Response } from 'express';

import cors from "cors";

import "dotenv/config"

import usersRouter from './src/routes/users';
import mongoose from "mongoose";


// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
// @ts-ignore
mongoose.connect(process.env.MONGO_URI);


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);


app.listen(3002,()=>{
    console.log("Server is running on port 3000");
})
