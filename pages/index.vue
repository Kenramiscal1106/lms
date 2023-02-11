<script setup lang="ts">
definePageMeta({
  middleware: "auth"
})
useHead({
  title: "Home | LMS"
})
</script>

<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <Navbar />
    <h1>Empty page</h1>
  </div>
</template>

<style>
body {
  margin-top: 5rem;
}
</style>