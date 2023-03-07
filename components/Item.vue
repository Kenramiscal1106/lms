<script lang="ts" setup>
import { FsItem } from '~~/utils/types';

const { item } = defineProps<{
  item: FsItem
}>()
</script>

<template>
  <li v-if="item.type === 'folder'">
    {{ item.name }}
    <ListItems :file-structure="item.children" />
  </li>
  <li v-else>
    <NuxtLink :to="`${item.type}/${item.to}`">{{ item.name }}</NuxtLink>
  </li>
</template>