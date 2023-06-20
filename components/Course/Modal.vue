<script lang="ts" setup>
const accessCodeFormOpen = ref<boolean>(false);

const accessCodeAction = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement;
  const formData = new FormData(formTarget);
  const accessCode = formData.get("access-code");
  await $fetch("/api/access-code", {
    method: "POST",
    body: JSON.stringify({ accessCode }),
    onResponse: ({ response }) => {
      if (!response.ok) return;
      refreshNuxtData("courses");
    },
  });
}) satisfies EventListener;

const { data, pending, error } = await useLazyFetch("/api/courses", {
  key: "courses",
});
</script>
<template>
  <div class="mx-auto my-8 max-w-2xl bg-white px-4 py-1">
    <Button @click="accessCodeFormOpen = !accessCodeFormOpen" variant="fill"
      >Join Course</Button
    >
    <form v-if="accessCodeFormOpen" @submit.prevent="accessCodeAction">
      <input
        type="text"
        id="access-code"
        placeholder="Enter Access code"
        name="access-code"
      />
      <Button variant="fill" type="submit">Submit</Button>
    </form>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">
      {{ error.message }}
    </div>
    <div v-else-if="data && data.courses.length !== 0">
      Your courses
      <div v-for="course in data.courses">
        <NuxtLink
          :to="`/course/${course._id}`"
          v-if="
            typeof course === 'object' &&
            course &&
            'name' in course &&
            '_id' in course
          "
          >{{ course.name }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
