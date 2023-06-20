<script setup lang="ts">
import z from "zod";
definePageMeta({
  middleware: ["logging"],
});
const formResult = ref<{
  success: boolean;
  type: "incorrect" | "validation";
  message: string;
} | null>(null);
const route = useRoute();
const handleSubmit = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement;
  const formData = new FormData(formTarget);
  const username = formData.get("username");
  const password = formData.get("password");

  const formSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(8),
  });

  const parsedData = formSchema.safeParse({ username, password });

  if (!parsedData.success) {
    formResult.value = {
      success: false,
      type: "validation",
      message: "validation error",
    };
    return;
  }

  const postReq = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  if (postReq.status === 400) {
    formResult.value = {
      success: false,
      type: "incorrect",
      message: "incorrect username or password",
    };
    return;
  }
  if (postReq.status === 500) {
    formResult.value = {
      success: false,
      type: "incorrect",
      message: "internal server error",
    };
    return;
  }
  const url = new URLSearchParams(window.location.search);
  navigateTo(
    typeof route.query.next !== "undefined"
      ? decodeURIComponent(route.query.next as string)
      : "/",
    {
      external: true,
    }
  );
}) satisfies EventListener;
useHead({
  title: "Login | LMS",
});
</script>

<template>
  <div class="m-auto max-w-sm rounded-md bg-white px-3 py-5">
    <h1>Login to LMS</h1>
    <form @submit.prevent="handleSubmit">
      <label for="username">Username</label><br />
      <input type="text" name="username" id="username" /> <br />
      <label for="password">Password</label><br />
      <input type="password" name="password" id="password" /> <br />
      <p>No Account yet? <NuxtLink to="/register">Register</NuxtLink></p>
      <Button type="submit" variant="fill">Submit</Button>
      <div
        v-if="formResult !== null && !formResult.success"
        class="text-red-700"
      >
        {{ formResult.message }}
      </div>
    </form>
  </div>
</template>
