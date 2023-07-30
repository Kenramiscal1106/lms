<script lang="ts" setup>
// import { defineProps } from 'vue';
import type { FsItem } from "~~/utils/types";
const { fileStructure } = defineProps<{
  fileStructure: FsItem[];
}>();
</script>

<template>
  <div class="space-y-3">
    <Item v-for="file in fileStructure" :item="file" />
  </div>
</template>
