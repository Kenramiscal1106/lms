<script setup lang='ts'>
definePageMeta({
  middleware: ["auth"]
})

const route = useRoute()
const { data } = await useFetch(`/api/course/${route.params.courseid}/page/${route.params.pageid}`)
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Not found"
  })
}
</script>
<template>
  <h2>{{ data?.name }}</h2>
  <p>{{ data?.text }}</p>
</template>
<style scoped></style>