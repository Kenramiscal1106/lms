<script setup lang='ts'>
const { route } = defineProps<{ route: ReturnType<typeof useRoute> }>()
const formAction = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement;
  const formData = Object.fromEntries(new FormData(formTarget).entries())
  const postReq = await fetch(`/api/course/${route.params.courseid}/add-folder`, {
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
    <form @submit.prevent="formAction">
      <label for="material-name">Folder name</label>
      <input type="text" name="name" id="material-name">
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<style scoped></style>