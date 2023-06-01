<script setup lang='ts'>
const { route } = defineProps<{ route: ReturnType<typeof useRoute> }>()
const formAction = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement;
  const formData = Object.fromEntries(new FormData(formTarget).entries())
  const postReq = await $fetch(`/api/course/${route.params.courseid}/add-material`, {
    method: "POST",
    body: JSON.stringify(formData),
    async onResponse({ response }) {
      if (response.ok) {
        console.log("updated successfully")
        await refreshNuxtData("materials")
      }
    }
  })
}) satisfies EventListener

</script>
<template>
  <div class="bg-white min-w-[300px]">
    <form @submit.prevent="formAction">
      <label for="material-type">Material type</label>
      <select name="type" id="material-type" placeholder="Material Type">
        <option value="quiz">Quiz</option>
        <option value="assignment">Assignment</option>
        <option value="page">Page</option>
        <option value="forum">Forums</option>
      </select> <br />
      <input type="text" name="name" id="material-name" placeholder="Material name">
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<style scoped></style>