<script setup lang='ts'>
const route = useRoute();
const { courseName } = defineProps<{
  courseName: string
}>()
</script>
<template>
  <aside>
    <h1>{{ courseName }}</h1>
    <div class="flex flex-col">
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
</template>
<style scoped></style>