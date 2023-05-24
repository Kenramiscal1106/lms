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
    <aside>
      <div class="link-container">
        <NuxtLink :to="`/course/${route.params.courseid}`"
          :class="`link ${route.path === `/course/${route.params.courseid}` ? ' open' : ''}`">Materials
        </NuxtLink>
        <NuxtLink :to="`/course/${route.params.courseid}/updates`"
          :class="`link ${route.path === `/course/${route.params.courseid}/updates` ? ' open' : ''}`">Updates
        </NuxtLink>
        <NuxtLink :to="`/course/${route.params.courseid}/members`"
          :class="`link ${route.path === `/course/${route.params.courseid}/members` ? ' open' : ''}`">Members
        </NuxtLink>
      </div>
    </aside>
    <main>
      <div>

        <h1>{{ data && data.name }}</h1>

        <NuxtPage />
      </div>
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