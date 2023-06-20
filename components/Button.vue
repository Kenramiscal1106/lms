<script setup lang="ts">
const { variant } = defineProps<{
  variant: "fill" | "outline";
}>();
</script>
<template>
  <button
    :class="[
      variant === 'fill'
        ? 'bg-neutral-700 text-white hover:bg-neutral-900'
        : 'border-2 border-neutral-300 hover:bg-neutral-300',
      'rounded-md px-3 py-2',
    ]"
  >
    <slot></slot>
  </button>
</template>
