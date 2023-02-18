export const useUserSession = async () => {
  const sessionCookie = useCookie("dbSession");
  if (!sessionCookie.value)
    return {
      isLoggedIn: false,
    };

  const {
    data: { value: userData },
    error,
    pending: { value: pending },
  } = await useFetch("/api/auth", {
    body: sessionCookie.value,
    method: "post",
  });
  return {
    isLoggedIn: error.value === null,
    userData,
    pending,
  };
};
export const useCurrentUser = () => useState<any>("user", () => null);
