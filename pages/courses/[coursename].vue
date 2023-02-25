<script setup lang='ts'>
const route = useRoute()
if (typeof route.params.coursename !== "string") {
  throw createError({
    statusCode: 400,
    statusMessage: "Unresolved error"
  })
}
const { data } = await useCourseData(route.params.coursename)
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
  <aside>
    <NuxtLink :to="`/courses/${route.params.coursename}`">Materials</NuxtLink>
    <NuxtLink :to="`/courses/${route.params.coursename}/members`">Members</NuxtLink>
  </aside>
  <NuxtPage />
</template>
<style scoped></style>