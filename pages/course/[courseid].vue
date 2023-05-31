<script setup lang='ts'>
const route = useRoute()
if (typeof route.params.courseid !== "string") {
  throw createError({
    statusCode: 400,
    statusMessage: "Unresolved error"
  })
}
const { data } = await useCourseData(route.params.courseid)
const courseStore = useCurrentCourse()
courseStore.value = data.value
definePageMeta({
  middleware: ["auth"]
})
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Not found"
  })
}
useHead({
  title: data.value.name + " | LMS"
})
</script>
<template>
  <div class="main">
    <CourseSidebar :courseName="data ? data.name : ''" />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
<style scoped>
.link:not(.open) {
  color: rgb(95, 95, 95);
  text-decoration: none;
}

.link:hover {
  color: black;
}

.open {
  color: black;
}

.link-container {
  display: flex;
  flex-flow: column nowrap;
}

.main {
  display: flex;
  max-width: 70rem;
  margin: auto;
}

aside {
  flex: 0 1 12rem;
}

main {
  flex: 1 1 0;
}
</style>