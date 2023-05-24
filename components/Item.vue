<script lang="ts" setup>
import { FsItem } from '~~/utils/types';
const route = useRoute()
const { item } = defineProps<{
  item: FsItem
}>()
</script>

<template>
  <details v-if="item.type === 'folder'" class="my-1">
    <summary class="flex space-x-5 px-4 py-2">
      <div>{{ item.name }}</div>

      <div class="flex space-x-3">
        <button>
          📁
        </button>
        <button>
          🗄
        </button>
      </div>
    </summary>
    <div class="ml-6">
      <ListItems :file-structure="item.children" />
    </div>
  </details>
  <NuxtLink :to="`${route.params.courseid}/${item.type}/${item.to}`" v-else class="block px-4 py-2 my-1">{{ item.name }}
  </NuxtLink>
</template>