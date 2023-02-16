<script setup lang='ts'>
const { data } = defineProps({
  data: String
})
</script>
<template>
  <h1>Home</h1>
  {{ data }}
</template>
<style scoped>

</style>