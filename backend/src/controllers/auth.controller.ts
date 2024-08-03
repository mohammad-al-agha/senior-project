import { Request, Response } from "express";
import { LoginAuthDTO, RegisterAuthDTO } from "./dtos/auth.dto";
import { Student } from "../models/student.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Instructor } from "../models/instructor.model";
import { validateEmail, validatePassword } from "../utilities/regex";

//Login as a student

export const loginAsStudent = async (
  req: Request<{}, {}, LoginAuthDTO>,
  res: Response
) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ studentEmail: email });

  if (!student) {
    return res.status(409).json({ message: "Invalid Credentials" });
  }

  validatePassword(password);

  const compare = await bcrypt.compare(password, student.studentPassword);

  if (!compare) {
    return res.status(409).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    {
      id: student._id,
      email: student.studentEmail,
    },
    process.env.JWT_SECRET
  );

  return res.json({ token: token, email: student.studentEmail });
};

//Login as an instructor

export const loginAsInstructor = async (
  req: Request<{}, {}, LoginAuthDTO>,
  res: Response
) => {
  const { email, password } = req.body;

  const instructor = await Instructor.findOne({ instructorEmail: email });

  if (!instructor) {
    return res.status(409).json({ message: "Invalid Credentials" });
  }

  const compare = await bcrypt.compare(password, instructor.instructorPassword);

  if (!compare) {
    return res.status(409).json({ message: "Invalid Credentials pass" });
  }

  const token = jwt.sign(
    {
      id: instructor._id,
      email: instructor.instructorEmail,
    },
    process.env.JWT_SECRET
  );

  return res.json({ token: token, email: instructor.instructorEmail });
};

//Sign Up

export const register = async (
  req: Request<{}, {}, RegisterAuthDTO>,
  res: Response
) => {
  const { name, email, password, type } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPass = await bcrypt.hash(password, salt);

  if (type === "Student") {
    const student = await Student.findOne({ studentEmail: email });

    if (student) {
      return res.status(409).json({ message: "The User already registered" });
    }

    const newStudent = new Student({
      studentName: name,
      studentEmail: email,
      studentPassword: hashedPass,
    });

    await newStudent.save();

    const { studentPassword, ...returnedStudent } = newStudent;

    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.studentEmail },
      process.env.JWT_SECRET
    );

    return res.json({ token: token, student: returnedStudent });
  } else {
    const instructor = await Instructor.findOne({ instructorEmail: email });

    if (instructor) {
      return res
        .status(409)
        .json({ message: "The instructor is already registered" });
    }

    const newinstructor = new Instructor({
      instructorName: name,
      instructorEmail: email,
      instructorPassword: hashedPass,
    });

    newinstructor.save();

    const { instructorPassword, ...returnedInstructor } = newinstructor;

    const token = jwt.sign(
      { id: newinstructor._id, email: newinstructor.instructorEmail },
      process.env.JWT_SECRET
    );

    return res.json({ token: token, instructor: returnedInstructor });
  }
};
