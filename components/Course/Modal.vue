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
  <div class="mx-auto my-8 max-w-2xl rounded-md bg-white px-4 py-5">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">
      {{ error.message }}
    </div>
    <div v-else-if="data && data.courses.length !== 0">
      <div class="flex items-center gap-3">
        <h3>Your courses</h3>
        <button
          @click="accessCodeFormOpen = !accessCodeFormOpen"
          :class="[
            'block h-max rounded-md',
            {
              ' bg-blue-500 px-2 py-1 hover:bg-blue-700 active:bg-blue-800':
                !accessCodeFormOpen,
              'bg-red-600 p-2 hover:bg-red-700 active:bg-red-800':
                accessCodeFormOpen,
            },
            'text-white ',
          ]"
          type="button"
        >
          <span v-if="accessCodeFormOpen">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 19.5L19.5 4.5M4.5 4.5L19.5 19.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span v-else> Join Course </span>
        </button>
      </div>
      <form v-if="accessCodeFormOpen" @submit.prevent="accessCodeAction">
        <input
          type="text"
          id="access-code"
          placeholder="Enter Access code"
          name="access-code"
        />
        <Button variant="fill" type="submit">Submit</Button>
      </form>
      <div v-for="course in data.courses">
        <NuxtLink
          :to="`/course/${course._id}`"
          v-if="
            typeof course === 'object' &&
            course &&
            'name' in course &&
            '_id' in course
          "
          class="active: block border-l-4 border-transparent px-3 py-2 no-underline hover:border-blue-500 hover:bg-neutral-300 active:font-bold"
          >{{ course.name }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
