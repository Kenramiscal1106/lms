<template>
  <Navbar />
  <slot></slot>
</template>

<style>
@tailwind base;

@layer base {
  * {
    font-family: "Inter";
  }

  h1 {
    @apply text-3xl;
  }

  h2 {
    @apply text-2xl;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-bold;
  }

  ul {
    @apply list-disc;
  }
}

body {
  margin-top: 5rem;
}
</style>