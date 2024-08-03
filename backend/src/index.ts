import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.config";
import AuthRouter from "./routes/auth.routes";
import CourseRouter from "./routes/course.routes";
import StudentRouter from "./routes/student.routes";
import InstructorRouter from "./routes/instructor.routes";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());

//auth
app.use("/auth", AuthRouter);

//course
app.use("/course", CourseRouter);

//instructor
app.use("/instructor", InstructorRouter);

//student
app.use("/student", StudentRouter);

app
  .listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
    connectDB();
  })
  .on("error", (e) => {
    console.log(e);
  });
