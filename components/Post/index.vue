<script setup lang='ts'>
import { Post, UserSchema } from '~/utils/types';

const { post } = defineProps<{
  post: Omit<Post, "author"> & {
    author: Pick<UserSchema, "_id" | "firstName" | "lastName" | "username">;
  }
}>()
console.log(post.createdAt)
</script>
<template>
  <article>
    <div>
      <div>
        {{ post.author.firstName + post.author.lastName }}
      </div>
      <div>
        {{ post.createdAt }}
      </div>
    </div>
    <div>{{ post.content }}</div>
  </article>
</template>
<style scoped></style>