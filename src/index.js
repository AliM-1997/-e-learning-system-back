import express from "express";
import userRouter from "./routers/user.routes.js"
import dotenv from "dotenv";
import connectToDataBase from "./database/connection.js";
const app=express()
dotenv.config();
app.use(express.json() )

app.use("/users",userRouter)
console.log(process.env.DATABASE_URL);

app.listen(8000,()=>{
    // console.log("app running on server 8000 successfully")
    connectToDataBase();
})