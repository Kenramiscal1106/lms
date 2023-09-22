<script setup lang="ts">
const route = useRoute();
if (typeof route.params.courseid !== "string") {
  throw createError({
    statusCode: 400,
    statusMessage: "Unresolved error",
  });
}
const { data } = await useCourseData(route.params.courseid);
const courseStore = useCurrentCourse();
courseStore.value = data.value;
definePageMeta({
  middleware: ["auth"],
});
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Not found",
  });
}
useHead({
  title: data.value.name + " | LMS",
});
</script>
<template>
  <div class="m-auto flex max-w-5xl gap-1 px-2">
    <CourseSidebar :courseName="data ? data.name : ''" />
    <main class="flex-1 bg-white px-4 py-2">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped></style>
