<script setup lang="ts">
definePageMeta({
  middleware: "auth"
})
useHead({
  title: "Home | LMS"
})
const userStore = useCurrentUser()
console.log(userStore.value)
</script>

<template>
  <div>
    <h1>Empty page</h1>
</div>
</template>

<style>
body {
  margin-top: 5rem;
}
</style>