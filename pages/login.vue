<script setup lang="ts">
import z from "zod"
definePageMeta({
  // middleware: "auth"
})
const formResult = ref<{
  success: boolean,
  type: "incorrect" | "validation",
  message: string
} | null>(null)

const handleSubmit = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement
  const formData = new FormData(formTarget)
  const username = formData.get("username")
  const password = formData.get('password')

  const formSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(8)
  })

  const parsedData = formSchema.safeParse({ username, password })

  if (!parsedData.success) {
    formResult.value = {
      success: false,
      type: "validation",
      message: "validation error"
    }
    return
  }

  const postReq = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
  const postRes = await postReq.json()
  if (postReq.status === 400) {
    formResult.value = {
      success: false,
      type: "incorrect",
      message: "incorrect username or password"
    }
    return
  }
  if (postReq.status === 500) {
    formResult.value = {
      success: false,
      type: "incorrect",
      message: "internal server error"
    }
    return
  }
  const url = new URLSearchParams(window.location.search)

  // alert("successfully logged in")
  window.location.pathname = "/"
}) satisfies EventListener
useHead({
  title: "Login | LMS"
})
</script>

<template>
  <h1>Login to LMS</h1>
  <form @submit.prevent="handleSubmit">
    <label for="username">Username</label><br>
    <input type="text" name="username" id="username"> <br>
    <label for="password">Password</label><br>
    <input type="password" name="password" id="password"> <br>
    <p>No Account yet? <NuxtLink to="/register">Register</NuxtLink>
    </p>
    <button type="submit">Submit</button>
    <div v-if="formResult !== null && !formResult.success">
      {{ formResult.message }}</div>
  </form>
</template>

<style scoped>
input {
  border: 1px solid black;
  padding: .25rem .5rem;
}
</style>