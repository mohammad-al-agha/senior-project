import { UserTypes } from "../../core/types/user.types";

export interface LoginAuthDTO {
  email: string;
  password: string;
}

export interface RegisterAuthDTO {
  name: string;
  email: string;
  password: string;
  type: UserTypes;
}
