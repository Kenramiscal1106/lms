import mongoose from "mongoose";

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
      ref: "courses",
    },
  ],
});

export const Courses = mongoose.model("courses", courses);

export const users = new mongoose.Schema({
  firstName: String,
  lastName: String,
  courses: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  ],
});
export const Users = mongoose.model("user", users);
