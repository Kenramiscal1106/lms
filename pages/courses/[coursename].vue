<script setup lang='ts'>
const route = useRoute()
console.log(route.params)
definePageMeta({
  middleware: ["auth"]
})
</script>
<template>
  <h1>Course page</h1>
</template>
<style scoped>

</style>