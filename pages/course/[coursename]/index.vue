<script setup lang='ts'>
const route = useRoute()
if (typeof route.params.coursename !== "string") {
  throw createError({
    statusCode: 400,
    statusMessage: "unhandled error"
  })
}

const { data: materials } = await useFetch(`/api/course/${route.params.coursename}/materials`)
const modalOpen = ref<boolean>(false);
</script>
<template>
  <div v-if="materials">
    <h2>materials</h2>
    <button @click="modalOpen = true">Add Material</button>
    <div v-if="materials.folderStructure.length !== 0">
      <ListItems :fileStructure="materials.folderStructure" />
    </div>
    <div v-else>
      There are no materials
    </div>
    <div v-if="modalOpen"
      class="bg-black bg-opacity-30 absolute w-screen h-screen top-0 left-0 flex justify-center items-center">
      <div class="bg-white ">
        <div class="max-w-4xl">
          <div>
            <button>Folder</button>
          </div>
          <div>
            <NuxtLink :to="route.path + '/quiz-create'">Quiz</NuxtLink>
          </div>
          <div>
            <NuxtLink :to="route.path + '/assignment-create'">Assignment</NuxtLink>
          </div>
          <div>
            <NuxtLink :to="route.path + '/page-create'">Page</NuxtLink>
          </div>
          <div>
            <NuxtLink :to="route.path + '/forum-create'">Forums</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>