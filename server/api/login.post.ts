import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const user = await Users.findOne({
    username,
  });

  if (!user) {
    return {
      success: false,
    };
  }

  if (!user.passwordHash) {
    return {
      success: false,
    };
  }

  const pwCompare = await bcrypt.compare(password, user.passwordHash);

  if (!pwCompare) {
    return {
      success: false,
    };
  }
  return {
    success: "idk",
  };
});
