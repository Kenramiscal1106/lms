<script setup lang="ts">

const handleSubmit = (async (e) => {
  const formData = new FormData(e.currentTarget as HTMLFormElement)
  const username = formData.get("username")
  const password = formData.get('password')

  const postReq = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
  const postRes = await postReq.json()
  console.log({ username, password, postRes })
}) satisfies EventListener
</script>

<template>
  <h1>Login to LMS</h1>
  <form @submit.prevent="handleSubmit">
    <label for="username">Username</label>
    <input type="text" name="username" id="username"> <br>
    <label for="password">Password</label>
    <input type="password" name="password" id="password"> <br>
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
input {
  border: 1px solid black;
  padding: .5rem;
}
</style>