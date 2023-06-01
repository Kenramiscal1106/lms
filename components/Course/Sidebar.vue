<script setup lang='ts'>
const { courseName } = defineProps<{
  courseName: string
}>()
</script>
<template>
  <aside class="basis-48 shrink-0 py-2">
    <h1>{{ courseName }}</h1>
    <div class="flex flex-col">
      <CourseSidebarNav to="materials">Materials
      </CourseSidebarNav>
      <CourseSidebarNav to="updates">Updates
      </CourseSidebarNav>
      <CourseSidebarNav to="members">Members
      </CourseSidebarNav>
    </div>
  </aside>
</template>
<style scoped></style>