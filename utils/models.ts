import mongoose from "mongoose";
import type { CourseSchema, UserSchema, Post } from "./types";

const { NUXT_MONGO_URL } = process.env;

if (typeof NUXT_MONGO_URL === "undefined") {
  throw new Error("NUXT_MONGO_URL is not defined in the .env file");
}
mongoose.connect(NUXT_MONGO_URL, {
  dbName: "lms",
});
mongoose.set("strictQuery", false);

const posts = new mongoose.Schema<Post>({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "posts",
    },
  ],
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "courses",
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  isComment: {
    type: Boolean,
    required: true,
    default: false,
  },
});
export const Posts = mongoose.model<Post>("posts", posts);

const courses = new mongoose.Schema<CourseSchema>({
  name: {
    type: String,
    required: true,
  },
  assignments: [],
  quizes: [],
  forums: [],
  pages: [],
  posts: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "posts",
    },
  ],
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
