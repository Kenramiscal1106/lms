<script setup lang='ts'>
const route = useRoute();
const { to } = defineProps<{
  to: "materials" | "members" | "updates"
}>();

</script>
<template>
  <NuxtLink :to="`/course/${route.params.courseid}/${to === 'materials' ? '' : to}`"
    :class="[`px-3 py-2 no-underline text-black`, route.path.endsWith(to === 'materials' ? '' : to) ? '' : 'hover:bg-neutral-200']"
    :exact-active-class="'font-bold bg-neutral-300 hover:bg-neutral-300 border-l-4 border-blue-500'">
    <slot></slot>
  </NuxtLink>
</template>
<style scoped></style>