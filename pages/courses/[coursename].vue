<script setup lang='ts'>
const router = useRoute()
console.log(router.params)
</script>
<template>
  <Navbar />
  <h1>Course page</h1>
  {{ router.params }}
</template>
<style scoped>

</style>