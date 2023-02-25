<script setup lang='ts'>
const courseStore = useCurrentCourse();
if (!courseStore.value) {
  throw createError({
    statusCode: 400,
    statusMessage: "Unresolved error"
  })
}
const route = useRoute()
console.log(courseStore.value)
const { data } = await useFetch(`/api/courses/${route.params.coursename}/materials`)
const userStore = useCurrentUser();
console.log(data.value)
const createModal = reactive<{
  open: boolean,
  type: "page" | "quizes" | "forums" | "assignments" | ""
}>({
  open: false,
  type: ""
})
const openModalAction = (type: typeof createModal["type"]) => {
  console.log(type)
  createModal.open = true
  createModal.type = type
}
</script>
<template>
  <div v-if="courseStore">

    <h1>{{ courseStore.name }}</h1>
    <div>
      <h1>Assignments</h1>
      <button v-if="userStore && userStore.userData && userStore.userData.role === 'teacher'"
        @click="openModalAction('assignments')">Add Assignment</button>
      <div v-if="courseStore.assignments.length !== 0">
        <div v-for="assignment in courseStore.assignments">
          {{ assignment.title }}
          {{ assignment.assignmentBody }}
        </div>
      </div>
    </div>
    <div>
      <h1>Pages</h1>
      <button v-if="userStore && userStore.userData && userStore.userData.role === 'teacher'"
        @click="openModalAction('page')">Add Page</button>
      <div v-if="courseStore.assignments.length !== 0">
        <div v-for="page in courseStore.pages">
          {{ page.title }}
          {{ page.assignmentBody }}
        </div>
      </div>
    </div>
  </div>
  <!-- <template v-if="courseStore">
                                        </template> -->
</template>
<style scoped></style>