import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { Student } from "../models/student.model";
import { Req } from "../core/types/requestType";

type DecodedType = {
  id: string;
  email: string;
};

export const StudentAuthMiddleWare = async (
  req: Req,
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

    const student = await Student.findById(decoded.id, "-password");

    req.user = student;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
