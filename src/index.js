import express from "express";
import dotenv from "dotenv";
import connectToDataBase from "./database/connection.js";
import userRouter from "./routes/user.routes.js";
import classRouter from "./routes/class.routes.js";
import courseRouter from "./routes/course.routes.js";
import enrollClass from "./routes/enrollment.routes.js";
const app = express();
dotenv.config();
app.use(express.json());

app.use("/users", userRouter);
app.use("/classes", classRouter);
app.use("/cources", courseRouter);
app.use("/", enrollClass);
console.log(process.env.DATABASE_URL);

app.listen(8000, () => {
  // console.log("app running on server 8000 successfully")
  connectToDataBase();
});
