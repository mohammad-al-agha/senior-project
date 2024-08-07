import { Request } from "express";
import { InstructorDoc } from "../../models/instructor.model";
import { StudentDoc } from "../../models/student.model";

export type Req<T = InstructorDoc | StudentDoc> = Request & {
  user?: T;
};
