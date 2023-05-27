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
    class="bg-black bg-opacity-30 absolute w-full h-full top-0 left-0 flex items-center justify-center"
    @click.self="modal.open = false">
    <div class="max-w-md h-max bg-white px-4 py-1">
      <div>
        <button @click="modal.open = false">Close modal</button>
      </div>
      <CreateMaterial v-if="modal.type === 'material'" :route="route" />
      <CreateFolder v-if="modal.type === 'folder'" :route="route" />
    </div>
  </div>
</template>