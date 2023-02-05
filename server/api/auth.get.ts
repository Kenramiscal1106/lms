import { Users } from "@/utils/models";

export default defineEventHandler(async (event) => {
  const cookie = await getCookie(event, "dbSession");

  if (!cookie) {
    return null;
  }

  const user = await Users.findOne({
    userAuthToken: cookie,
  });

  if (!user) {
    return null;
  }

  return {
    message: "successfully logged in",
  };
});
