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
  <Post v-for="post in (data.posts)" :post="(post as any)" v-else-if="data && data.posts.length !== 0" />
  <div v-else>
    There are no posts.
  </div>
</template>
<style scoped></style>