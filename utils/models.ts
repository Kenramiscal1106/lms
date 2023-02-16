import mongoose from "mongoose";
import type { CourseSchema } from "./types";

const { NUXT_MONGO_URL } = process.env;

if (typeof NUXT_MONGO_URL === "undefined") {
  throw new Error("NUXT_MONGO_URL is not defined in the .env file");
}
mongoose.connect(
  NUXT_MONGO_URL,
  {
    dbName: "lms",
  },
  () => {
    console.log("connected to database");
  }
);
// connectToDB();
const courses = new mongoose.Schema<CourseSchema>({
  name: String,
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
  role: {
    type: String,
    default: "student",
  },
});

export const Courses = mongoose.model<CourseSchema>("courses", courses);

export const users = new mongoose.Schema({
  firstName: String,
  passwordHash: String,
  userAuthToken: String,
  lastName: String,
  username: String,
  courses: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "courses",
    },
  ],
});
export const Users = mongoose.models.user || mongoose.model("user", users);
