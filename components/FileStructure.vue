<script lang="ts" setup>
const { route } = defineProps<{ route: ReturnType<typeof useRoute> }>()
const { data: materials } = await useFetch(`/api/course/${route.params.coursename}/materials`);
const modal = reactive<{
  type: "material" | "folder",
  open: boolean
}>({
  open: false,
  type: "material"
})
</script>

<template>
  <button @click="modal.open = true">Add materials</button>

  <ListItems v-if="materials && materials.folderStructure.length !== 0" :fileStructure="materials.folderStructure" />
  <div v-show="modal.open"
    class="bg-black bg-opacity-30 absolute w-screen h-screen top-0 left-0 flex justify-center items-center">
    <CreateMaterial v-if="modal.type === 'material'" :route="route" />
  </div>
</template>