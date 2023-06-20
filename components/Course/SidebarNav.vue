<script setup lang="ts">
const route = useRoute();
const { to } = defineProps<{
  to: "materials" | "members" | "updates";
}>();
</script>
<template>
  <NuxtLink
    :to="`/course/${route.params.courseid}${
      to === 'materials' ? '' : '/' + to
    }`"
    :class="[`border-l-4 px-3 py-2 text-black no-underline`, route.path.endsWith(to === 'materials' ? route.params.courseid as string : to) ? '' : 'border-l-transparent hover:bg-neutral-200']"
    :exact-active-class="'font-bold bg-neutral-300 hover:bg-neutral-300 border-blue-500'"
  >
    <slot></slot>
  </NuxtLink>
</template>
<style scoped></style>
