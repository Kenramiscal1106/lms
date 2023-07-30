<script setup lang="ts">
const { variant } = defineProps<{
  variant: "fill" | "outline";
  type: HTMLButtonElement["type"];
}>();
</script>
<template>
  <button
    :class="[
      variant === 'fill'
        ? 'bg-neutral-700 text-white hover:bg-neutral-900'
        : 'border-2 border-neutral-200 hover:bg-neutral-200 active:bg-neutral-300',
      'rounded-md px-3 py-2',
    ]"
    :type="type"
  >
    <slot></slot>
  </button>
</template>
