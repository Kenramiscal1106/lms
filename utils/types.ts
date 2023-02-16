import { Types } from "mongoose";

export type CourseSchema = {
  _id: Types.ObjectId;
  name: string;
  assignments: any[];
  quizes: any[];
  forums: any[];
  pages: any[];
  posts: any[];
  members: Types.ObjectId[];
  role: "student" | "teacher" | "admin";
};

export type UserSchema = {
  _id: Types.ObjectId;
  firstName: string;
  passwordHash: string;
  userAuthToken: string;
  lastName: string;
  username: string;
  courses: Types.ObjectId[];
};
