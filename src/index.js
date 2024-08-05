import express from "express";
import dotenv from "dotenv";
import connectToDataBase from "./database/connection.js";
import userRouter from "./routes/user.routes.js";
import classRouter from "./routes/class.routes.js";
import courseRouter from "./routes/course.routes.js";
import enrollClass from "./routes/enrollment.routes.js";
import authRouter from "./routes/auth.routes.js";
import { authmiddleWare } from "./middleware/auth.middleware.js";
import { adminMiddleware } from "./middleware/auth.middleware.js";
const app = express();
dotenv.config();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/classes", authmiddleWare, adminMiddleware, classRouter);
app.use("/cources", authmiddleWare, courseRouter);
app.use("/", authmiddleWare, enrollClass);
console.log(process.env.DATABASE_URL);

app.listen(8000, () => {
  // console.log("app running on server 8000 successfully")
  connectToDataBase();
});
