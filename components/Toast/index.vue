<script setup lang='ts'>
import type { ToastData } from '~/utils/types';

const { toastData } = defineProps<{
  toastData: ToastData
}>();
</script>
<template>
  <div class="bg-black text-white px-3 py-2 max-w-sm">
    {{ toastData.message }}
  </div>
</template>
<style scoped></style>