<script setup lang="ts">
import { modalStore } from "~/composables/stores";

const modal = modalStore();
const { route } = defineProps<{ route: ReturnType<typeof useRoute> }>();
const formAction = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement;
  const formData = Object.fromEntries(new FormData(formTarget).entries());
  const postReq = await $fetch(
    `/api/course/${route.params.courseid}/add-folder`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      onResponse({ response }) {
        if (response.ok) {
          console.log("update successfully");
          refreshNuxtData("materials");
          modal.close();
        }
      },
    }
  );
}) satisfies EventListener;
</script>
<template>
  <div class="min-w-[300px] bg-white">
    <form @submit.prevent="formAction">
      <label for="material-name">Folder name</label>
      <input type="text" name="name" id="material-name" />
      <br />
      <button @click="modal.close()" type="button">Cancel</button>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<style scoped></style>
