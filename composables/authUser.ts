export const useUserSession = async () => {
  const sessionCookie = useCookie("dbSession");
  console.log(sessionCookie.value);
  if (!sessionCookie.value)
    return {
      isLoggedIn: false,
    };

  const { data, error, pending } = await useFetch("/api/auth", {
    body: sessionCookie.value,
    method: "post",
  });
  return {
    isLoggedIn: error.value === null,
  };
};
