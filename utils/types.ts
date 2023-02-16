import { Types } from "mongoose";

export type CourseSchema = {
  name: string;
  assignments: any[];
  quizes: any[];
  forums: any[];
  pages: any[];
  posts: any[];
  members: Types.ObjectId;
  role: "student" | "teacher" | "admin";
};
