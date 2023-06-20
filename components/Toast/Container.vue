<script setup lang="ts">
import { useToastStore } from "~/composables/stores";

const store = useToastStore();
</script>
<template>
  <div class="absolute bottom-2 left-2 space-y-2">
    <Toast
      v-for="toastData in store.toasts"
      v-bind="{ toastData }"
      v-if="store.toasts.length !== 0"
    />
  </div>
</template>
<style scoped></style>
