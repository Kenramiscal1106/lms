export const useUserSession = async () => {
  const {
    data: { value: userData },
    error,
    pending: { value: pending },
  } = await useFetch("/api/auth");
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
