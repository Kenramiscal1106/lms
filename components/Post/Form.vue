<script setup lang='ts'>
const route = useRoute();
const formAction = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement;
  const formData = Object.fromEntries(new FormData(formTarget).entries())
  const result = await $fetch(`/api/course/${route.params.courseid}/add-post`, {
    method: 'POST',
    body: JSON.stringify(formData),
    async onResponse({ response }) {
      if (response.ok) {
        console.log("posts updated successfully");
        await refreshNuxtData("posts")
      }
    }
  })
}) satisfies EventListener
</script>
<template>
  <form @submit.prevent="formAction">
    <textarea name="content"></textarea>
    <Button type="submit" :variant='"fill"'>Submit</Button>
  </form>
</template>
<style scoped></style>