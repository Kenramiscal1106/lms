import mongoose from "mongoose";
import type { CourseSchema, UserSchema, Assignment } from "./types";

const { NUXT_MONGO_URL } = process.env;

if (typeof NUXT_MONGO_URL === "undefined") {
  throw new Error("NUXT_MONGO_URL is not defined in the .env file");
}
mongoose.connect(NUXT_MONGO_URL, {
  dbName: "lms",
});
mongoose.set("strictQuery", false);

/* const assignmentSchema = new mongoose.Schema<Assignment>({
  deadline: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  materialId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
}); */

const courses = new mongoose.Schema<CourseSchema>({
  name: {
    type: String,
    required: true,
  },
  assignments: [],
  quizes: [],
  forums: [],
  pages: [],
  posts: [],
  members: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  ],
  folderStructure: [],
});

export const Courses = mongoose.model<CourseSchema>("courses", courses);

export const users = new mongoose.Schema<UserSchema>({
  firstName: String,
  passwordHash: {
    type: String,
    index: true,
  },
  userAuthToken: {
    type: String,
    index: true,
  },
  lastName: String,
  username: String,
  courses: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "courses",
    },
  ],
  role: {
    type: String,
    default: "student",
    required: true,
  },
});
export const Users = mongoose.model<UserSchema>("user", users);
