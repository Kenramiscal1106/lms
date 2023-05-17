export const useUserSession = async () => {
  const sessionCookie = useCookie("dbSession");
  if (!sessionCookie.value)
    return {
      isLoggedIn: false,
      userData: null,
      pending: false,
      update: null,
    };

  const {
    data: { value: userData },
    error,
    pending: { value: pending },
    refresh,
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
export const useCourseData = async (courseId: string) => {
  const fetch = await useFetch(`/api/course/${courseId}`);
  return { ...fetch };
};
type UserSession = Awaited<ReturnType<typeof useUserSession>>;
type CourseData = Awaited<ReturnType<typeof useCourseData>>;
export const useCurrentUser = () =>
  useState<null | UserSession>("user", () => null);
export const useCurrentCourse = () =>
  useState<null | CourseData["data"]["value"]>("course", () => null);
