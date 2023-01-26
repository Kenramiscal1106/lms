import mongoose from "mongoose";
// import { connectToDB  } from "./database";

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
const courses = new mongoose.Schema({
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
});

export const Courses =
  mongoose.models.courses || mongoose.model("courses", courses);

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
