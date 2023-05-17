<script lang="ts" setup>
// import { defineProps } from 'vue';
import type { FsItem } from "~~/utils/types"
const { fileStructure } = defineProps<{
  fileStructure: FsItem[]
}>()

</script>

<template >
  <div v-for="file in fileStructure">
    <Item :item="file" />
  </div>
</template>