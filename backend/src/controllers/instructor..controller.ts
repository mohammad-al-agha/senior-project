import { Request, Response } from "express";
import { Instructor } from "../models/instructor.model";
import { GetCoursesDTO } from "./dtos/instructor.dto";

//get courses
export const getInstructorCourses = async (
  req: Request<{}, {}, GetCoursesDTO>,
  res: Response
) => {
  const { id } = req.body;

  const instructor = await Instructor.findById(id).populate("InstructorCorses");

  console.log(instructor);

  if (!instructor) {
    return res.status(404).json({ message: "Instructor not found" });
  }

  res.json(instructor.instructorCourses);
};
//upload course data
//view meetings calendar (calendly)?
//attendance sheet
// add comments on the student's progress
