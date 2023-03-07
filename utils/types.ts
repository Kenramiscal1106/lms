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
  folderStructure: FsItem[];
};

export type UserSchema = {
  _id: Types.ObjectId;
  firstName: string;
  passwordHash: string;
  userAuthToken: string;
  lastName: string;
  username: string;
  courses: Types.ObjectId[];
  role: "student" | "teacher" | "admin";
};

type FsItem =
  | {
      name: string;
      type: "folder";
      children: FsItem[];
    }
  | {
      name: string;
      type: "assignment" | "quiz" | "forums" | "pages" | "posts";
      to: string;
    };
