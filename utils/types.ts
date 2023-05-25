import { Types } from "mongoose";

export type CourseSchema = {
  _id: Types.ObjectId;
  name: string;
  assignments: any[];
  quizes: Quiz[];
  forums: Forum[];
  pages: Page[];
  posts: Post[];
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

export type FsItem =
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

export type CourseMaterial = {
  name: string;
  materialId: string;
  published: boolean;
  deadline: string;
};

export type QuizItem = {
  question: string;
  equivalentPoints: number;
  itemId: string;
} & (
  | {
      type: "multiple choice";
      options: Map<string, string>;
      correctAnswer: string;
    }
  | {
      type: "identification";
      correctAnswers: string[];
      caseSensitive: boolean;
    }
  | {
      type: "essay";
    }
);

export type Quiz = {
  instructions: string;
  items: QuizItem[];
} & CourseMaterial;

export type Assignment = {
  instructions: string;
} & CourseMaterial;

export type Post = {
  author: Types.ObjectId;
  content: string;
};
export type Forum = {
  query: string;
} & CourseMaterial;
export type Page = {
  text: string;
} & CourseMaterial;
