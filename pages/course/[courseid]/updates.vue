<script setup lang='ts'>
const route = useRoute()
const { data, pending, error } = await useLazyFetch(`/api/course/${route.params.courseid}/posts`, {
  key: "posts",
  server: false
})
</script>
<template>
  <PostForm />
  <div v-if="pending">
    <h4>Loading...</h4>
  </div>
  <div v-else-if="error && !data">
    <h4>
      {{ error.message }}
    </h4>
  </div>
  <div v-else-if="data">
    <div v-for="post in data.posts">
      <h4>{{ post.author.firstName + post.author.lastName }}</h4>
      <div>{{ post.content }}</div>
    </div>
  </div>
</template>
<style scoped></style>