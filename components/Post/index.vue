<script setup lang="ts">
import { Post, UserSchema } from "~/utils/types";

const { post } = defineProps<{
  post: Omit<Post, "author"> & {
    author: Pick<UserSchema, "_id" | "firstName" | "lastName" | "username">;
  };
}>();
</script>
<template>
  <article class="my-4 rounded-md border-2 border-neutral-100 p-4">
    <div>
      <div class="text-lg font-bold">
        {{ post.author.firstName + " " + post.author.lastName }}
      </div>
      <div class="text-sm">
        {{ format(post.createdAt) }}
      </div>
    </div>

    <div class="mt-3">{{ post.content }}</div>
  </article>
</template>
<style scoped></style>
