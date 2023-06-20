<script lang="ts" setup>
const { route } = defineProps<{ route: ReturnType<typeof useRoute> }>();
const {
  data: materials,
  pending,
  error,
} = await useLazyFetch(`/api/course/${route.params.courseid}/materials`, {
  key: "materials",
});
const modal = reactive<{
  type: "material" | "folder";
  open: boolean;
}>({
  open: false,
  type: "material",
});
</script>

<template>
  <div class="flex gap-3">
    <Button
      variant="outline"
      @click="
        modal.open = true;
        modal.type = 'material';
      "
      >Add materials</Button
    >
    <Button
      variant="outline"
      @click="
        modal.open = true;
        modal.type = 'folder';
      "
      >Add folder</Button
    >
  </div>

  <div v-if="pending">
    <h4>Loading...</h4>
  </div>
  <div v-else-if="error">
    <h4>{{ error.message }}</h4>
  </div>
  <ListItems
    v-if="!pending && materials && materials.folderStructure.length !== 0"
    :fileStructure="materials.folderStructure"
  />

  <div
    v-show="modal.open"
    class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30"
    @click.self="modal.open = false"
  >
    <div class="h-max max-w-md bg-white px-4 py-1">
      <div>
        <button @click="modal.open = false">Close modal</button>
      </div>
      <CreateMaterial v-if="modal.type === 'material'" :route="route" />
      <CreateFolder v-if="modal.type === 'folder'" :route="route" />
    </div>
  </div>
</template>
