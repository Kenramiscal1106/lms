<script setup lang="ts">
import { modalStore } from "~/composables/stores";

const modal = modalStore();
const { route } = defineProps<{ route: ReturnType<typeof useRoute> }>();
const formAction = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement;
  const formData = Object.fromEntries(new FormData(formTarget).entries());
  await $fetch(`/api/course/${route.params.courseid}/add-material`, {
    method: "POST",
    body: JSON.stringify(formData),
    async onResponse({ response }) {
      if (response.ok) {
        console.log("updated successfully");
        await refreshNuxtData("materials");
        modal.close();
      }
    },
  });
}) satisfies EventListener;
</script>
<template>
  <div class="min-w-[300px] bg-white">
    <form @submit.prevent="formAction">
      <label for="material-type">Material type</label>
      <select name="type" id="material-type" placeholder="Material Type">
        <option value="quiz">Quiz</option>
        <option value="assignment">Assignment</option>
        <option value="page">Page</option>
        <option value="forum">Forums</option>
      </select>
      <input
        type="text"
        name="name"
        id="material-name"
        placeholder="Material name"
      />
      <div>
        <Button @click="modal.close()" type="button">Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
