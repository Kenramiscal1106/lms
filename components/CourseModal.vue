<script lang="ts" setup>
const { accessCodeFormOpen, coursesOpen } = defineProps<{
  accessCodeFormOpen: boolean,
  coursesOpen: boolean
}>()

const accessCodeAction = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement
  const formData = new FormData(formTarget)
  const accessCode = formData.get("access-code")

  const postReq = await fetch("/api/access-code", {
    method: "POST",
    body: JSON.stringify({ accessCode })
  })
  if (!postReq.ok) return
  window.location.reload()
}) satisfies EventListener

const { data, pending } = await useLazyFetch("/api/courses")
</script>
<template>
  <div class="max-w-2xl mx-auto my-8 bg-white px-4 py-1">
    <button @click="accessCodeFormOpen = !accessCodeFormOpen">Join Course</button>
    <form v-if="accessCodeFormOpen" @submit.prevent="accessCodeAction">
      <input type="text" id="access-code" placeholder="Enter Access code" name="access-code" />
      <button type="submit">Submit</button>
    </form>
    <div v-if="!pending && data && data.courses.length !== 0">
      Your courses
      <div v-for="course in data.courses">
        <NuxtLink :to="`/course/${course._id}`"
          v-if="(typeof course === 'object' && course && 'name' in course && '_id' in course)"
          @click="coursesOpen = !coursesOpen">{{ course.name }}</NuxtLink>
      </div>
    </div>
  </div>
</template>