import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.config";
import AuthRouter from "./routes/auth.routes";
import CourseRouter from "./routes/course.routes";
import StudentRouter from "./routes/student.routes";
import InstructorRouter from "./routes/instructor.routes";
import UploadsRouter from "./routes/upload.routes";
import cors from "cors";
import { StudentAuthMiddleWare } from "./middlewares/student.auth.middleware";
import { InstructorAuthMiddleWare } from "./middlewares/instructor.auth.middleware";
import { upload } from "./config/multer.config";

const app: Express = express();

app.use(express.json());
app.use(cors());

//auth
app.use("/auth", AuthRouter);

//uploads
app.use("/uploads", upload.array("file", 5), UploadsRouter);

//course
app.use("/course", CourseRouter);

//instructor
app.use("/instructor", InstructorAuthMiddleWare, InstructorRouter);

//student
app.use("/student", StudentAuthMiddleWare, StudentRouter);

app
  .listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
    connectDB();
  })
  .on("error", (e) => {
    console.log(e);
  });
