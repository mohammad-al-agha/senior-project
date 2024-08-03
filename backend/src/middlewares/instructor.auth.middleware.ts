import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Instructor } from "../models/instructor.model";

type DecodedType = {
  id: string;
  email: string;
};
export const InstructorAuthMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    const decoded: DecodedType = verify(
      token,
      process.env.JWT_SECRET
    ) as DecodedType;
    const instructor = await Instructor.findById(decoded.id, "-password");

    req.body = instructor;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
