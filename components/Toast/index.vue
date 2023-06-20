<script setup lang="ts">
import { ToastData } from "~/utils/types";

const { toastData } = defineProps<{
  toastData: ToastData;
}>();

const open = ref(true);
</script>
<template>
  <div
    :class="[
      {
        'bg-red-200 text-red-800': toastData.type === 'error',
        'bg-green-200 text-green-800': toastData.type === 'success',
        hidden: !open,
      },
      'relative max-w-xs overflow-hidden rounded-lg px-4 py-3',
    ]"
  >
    <h4 class="m-1">{{ toastData.type }}</h4>
    {{ toastData.message }}
    <button @click="open = !open">Close</button>
    <div
      :class="[
        {
          'from-red-500 to-orange-400': toastData.type === 'error',
          'bg-green-800': toastData.type === 'success',
        },
        'progress absolute bottom-0 left-0 h-1 bg-gradient-to-tr',
      ]"
    ></div>
  </div>
</template>

<style scoped>
@keyframes lower-width {
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
}

.progress {
  animation: lower-width 6000ms forwards linear;
}
</style>
