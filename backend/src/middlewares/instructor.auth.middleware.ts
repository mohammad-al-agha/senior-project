import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { Instructor } from "../models/instructor.model";

type DecodedType = {
  id: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      email: string;
      password: string;
      instructor?: JwtPayload;
      student?: JwtPayload;
    }
  }
}

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

    req.instructor = instructor;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
