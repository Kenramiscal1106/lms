<script setup lang="ts">
import { z } from "zod"
definePageMeta({
  // middleware: ["auth"]
})
const passwordRef = ref("")
const confirmPasswordRef = ref("")
const formResult = ref<{
  success: boolean,
  type: "password error" | "empty field"
  message: string
} | null>(null)
const handleSubmit = (async (e) => {
  const formData = new FormData(e.currentTarget as HTMLFormElement)
  const formSchema = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    password: z.string().min(8),
    username: z.string().min(4)
  })
  const firstname = formData.get("firstname")
  const lastname = formData.get("lastname")
  const password = formData.get('password')
  const username = formData.get("username")

  if (passwordRef.value !== confirmPasswordRef.value) {
    formResult.value = {
      success: false,
      type: "password error",
      message: "Password doesn't match"
    }
    return
  }
  const parsedData = formSchema.safeParse({ firstname, lastname, password, username })
  if (!parsedData.success) {
    formResult.value = {
      success: false,
      type: "empty field",
      message: "validation error"
    }
    return
  }

  const postReq = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ firstname, lastname, password, username })
  });
  const postRes = await postReq.json()
  if (postRes.success) {
    navigateTo({
      path: "/login"
    })
  }
}) satisfies EventListener
useHead({
  title: "Register | LMS",
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Register to LMS</h1>
    <label for="firstname">First name</label><br>
    <input type="text" name="firstname" id="firstname"> <br>
    <label for="lastname">Last name</label><br>
    <input type="text" name="lastname" id="lastname"> <br>
    <label for="username">Username</label><br>
    <input type="text" name="username" id="username">
    <br>
    <label for="password">Password</label><br>
    <input type="password" name="password" id="password" v-model="passwordRef"><br>
    <label for="confirm-password">Confirm Password</label><br>
    <input type="password" name="password" id="confirm-password" v-model="confirmPasswordRef" /><br>
    <p>Already have an account? Go to <NuxtLink to="/login">Login</NuxtLink>
    </p>
    <div v-if="formResult !== null && !formResult.success">
      {{ formResult.message }}
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
input {
  border: 1px solid black;
  padding: .25rem .5rem;
}
</style>