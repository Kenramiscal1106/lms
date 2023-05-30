<script setup lang='ts'>
const route = useRoute()
const { data } = await useFetch(`/api/course/${route.params.courseid}/posts`)
</script>
<template>
  <div v-if="data">
    <div v-for="post in data.posts">
      <h4>{{ post.author.username }}</h4>
      <div>{{ post.content }}</div>
    </div>
  </div>
</template>
<style scoped></style>