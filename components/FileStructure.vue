<script lang="ts" setup>
const { route } = defineProps<{ route: ReturnType<typeof useRoute> }>()
const { data: materials } = await useFetch(`/api/course/${route.params.courseid}/materials`);
const modal = reactive<{
  type: "material" | "folder",
  open: boolean
}>({
  open: false,
  type: "material"
})
</script>

<template>
  <button @click="modal.open = true; modal.type = 'material'">Add materials</button>
  <button @click="modal.open = true; modal.type = 'folder'">Add folder</button>

  <ListItems v-if="materials && materials.folderStructure.length !== 0" :fileStructure="materials.folderStructure" />
  <div v-show="modal.open"
    class="bg-black bg-opacity-30 absolute w-screen h-screen top-0 left-0 flex justify-center items-center">
    <button @click="modal.open = false">Close modal</button>
    <CreateMaterial v-if="modal.type === 'material'" :route="route" />
    <CreateFolder v-if="modal.type === 'folder'" :route="route" />
  </div>
</template>