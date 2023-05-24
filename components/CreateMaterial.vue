<script setup lang='ts'>
const { route } = defineProps<{ route: ReturnType<typeof useRoute> }>()
const addMaterial = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement;
  const formData = Object.fromEntries(new FormData(formTarget).entries())
  const postReq = await fetch(`/api/course/${route.params.courseid}/add-material`, {
    method: "POST",
    body: JSON.stringify(formData)
  })

  if (!postReq.ok) {
    console.log("bad request :(")
    return
  }
  console.log("submitted successfully")
}) satisfies EventListener

</script>
<template>
  <div class="bg-white min-w-[300px]">
    <form @submit.prevent="addMaterial">
      <label for="material-type">Material type</label>
      <select name="type" id="material-type">
        <option value="quiz">Quiz</option>
        <option value="assignment">Assignment</option>
        <option value="page">Page</option>
        <option value="forum">Forums</option>
      </select> <br />
      <label for="material-name">Material name</label>
      <input type="text" name="name" id="material-name">
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<style scoped></style>