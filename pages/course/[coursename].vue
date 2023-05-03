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
  <main>
    <aside>
      <div class="link-container">
        <NuxtLink :to="`/course/${route.params.coursename}`"
          :class="`link ${route.path === `/course/${route.params.coursename}` ? ' open' : ''}`">Materials
        </NuxtLink>
        <NuxtLink :to="`/course/${route.params.coursename}/updates`"
          :class="`link ${route.path === `/course/${route.params.coursename}/updates` ? ' open' : ''}`">Updates
        </NuxtLink>
        <NuxtLink :to="`/course/${route.params.coursename}/members`"
          :class="`link ${route.path === `/course/${route.params.coursename}/members` ? ' open' : ''}`">Members
        </NuxtLink>
      </div>
    </aside>
    <div>

      <h1>{{ data && data.name }}</h1>

      <NuxtPage />
    </div>
  </main>
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

main {
  display: flex;
}

aside {
  width: 10rem;
}
</style>