import express from "express";
import mongoose from "mongoose";
import router from "./router/router.js";
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();
const port = dotenv.config().parsed.PORT;
const url = "mongodb+srv://admin:admin@cluster0.dbr2h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    withCredentials: true,
}));
app.use(fileUpload({}));
app.use("/", router);
app.use(express.static("static"));

async function start() {
    try {
        await mongoose.connect(
            url,
            {
                useUnifiedTopology: true, 
                useNewUrlParser: true
            }
        )
        app.listen(port, ()=>{
            console.log(`server start on port ${port}`);
        })
    } catch (error) {
        console.log("MY ERROR ",error);
    }
}

start();