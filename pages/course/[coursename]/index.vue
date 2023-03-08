<script setup lang='ts'>
const route = useRoute()
if (typeof route.params.coursename !== "string") {
  throw createError({
    statusCode: 400,
    statusMessage: "unhandled error"
  })
}

const course = await useCourseData(route.params.coursename)
const { data: materials } = await useFetch(`/api/course/${route.params.coursename}/materials`)
const userStore = useCurrentUser();
// console.log(data.value)
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
  <div v-if="materials">

    <h2>materials</h2>
    <div v-if="materials.folderStructure.length !== 0">

      <ListItems :fileStructure="materials.folderStructure" />
    </div>
    <div v-else>
      There are no materials
    </div>
  </div>
</template>
<style scoped></style>