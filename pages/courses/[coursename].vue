<script setup lang='ts'>
const route = useRoute()
const { data } = await useFetch(`/api/courses/${route.params.coursename}`)
console.log(route.params)
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
  title: data.value.name
})
</script>
<template>
  <aside>
    <NuxtLink :to="`/courses/${route.params.coursename}`">Materials</NuxtLink>
    <NuxtLink :to="`/courses/${route.params.coursename}/members`">Members</NuxtLink>
  </aside>
  <NuxtPage :data="data" />
</template>
<style scoped>

</style>