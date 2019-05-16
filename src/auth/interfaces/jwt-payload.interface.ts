import { UserModel } from "src/user/models/user.model";

export interface JwtPayload {
    email: string;
    pass: string;
  }

export interface AuthUser{
  user: UserModel;
  token: string;
}