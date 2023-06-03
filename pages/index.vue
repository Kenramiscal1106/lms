<script setup lang="ts">
definePageMeta({
  middleware: "auth"
})
useHead({
  title: "Home | LMS"
})
const { data, pending, error } = useLazyFetch("/api/home", {
  key: "home-posts",
  server: false
})
</script>

<template>
  <div class="max-w-4xl m-auto">
    <h1>Home</h1>
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
        <h4>{{ post.author.firstName + " " + post.author.lastName }}</h4>
        <div>{{ post.content }}</div>
      </div>
    </div>
  </div>
</template>

<style></style>