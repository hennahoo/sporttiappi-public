import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user.js";
import { tagsRouter } from "./routes/tags.js";

const app =  express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/tags", tagsRouter);

mongoose.connect(
    "mongodb+srv://fullstack:<PASSWORD-HERE>@fullstack01.g6cvkil.mongodb.net/tags?retryWrites=true&w=majority");
//    {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//    }   
//    );

app.listen(3001, () => console.log("SERVERI KÄYNNISSÄ"));

