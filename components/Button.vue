<script setup lang='ts'>
const { variant } = defineProps<{
  variant: "fill" | "outline"
}>()
</script>
<template>
  <button
    :class="[variant === 'fill' ? 'bg-neutral-700 hover:bg-neutral-900 text-white' : 'border-2 border-neutral-300 hover:bg-neutral-300', 'px-3 py-2 rounded-md']">
    <slot></slot>
  </button>
</template>