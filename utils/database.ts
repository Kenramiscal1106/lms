import mongoose from "mongoose";

const { NUXT_MONGO_URL } = process.env;

if (typeof NUXT_MONGO_URL === "undefined") {
  throw new Error("NUXT_MONGO_URL is not defined in the .env file");
}

mongoose.connect(NUXT_MONGO_URL, {
  dbName: "lms",
});
