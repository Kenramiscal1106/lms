<script lang="ts" setup>
import { FsItem } from "~~/utils/types";
const route = useRoute();
const { item } = defineProps<{
  item: FsItem;
}>();
</script>

<template>
  <details
    v-if="item.type === 'folder'"
    class="rounded-md border-2 border-neutral-100 px-4 py-3 no-underline hover:bg-neutral-100 active:bg-neutral-200"
  >
    <summary class="flex space-x-5">
      <div>{{ item.name }}</div>

      <div class="flex space-x-3">
        <button>📁</button>
        <button>🗄</button>
      </div>
    </summary>
    <div class="ml-6">
      <ListItems :file-structure="item.children" />
    </div>
  </details>
  <NuxtLink
    :to="`${route.params.courseid}/${item.type}/${item.to}`"
    v-else
    class="block rounded-md border-2 border-neutral-100 px-4 py-3 no-underline hover:bg-neutral-100 active:bg-neutral-200"
    >{{ item.name }}
  </NuxtLink>
</template>
