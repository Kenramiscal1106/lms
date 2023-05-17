<script setup lang='ts'>
const route = useRoute()
if (typeof route.params.coursename !== "string") {
  throw createError({
    statusCode: 400,
    statusMessage: "unhandled error"
  })
}


</script>
<template>
  <h2>materials</h2>
  <FileStructure :route="route" />
</template>

<style scoped></style>