<script setup lang='ts'>
import { useCurrentUser } from '~~/composables/authUser';

const coursesOpen = ref(false);
const accessCodeFormOpen = ref(false);
const user = await useUserSession()
const userStore = useCurrentUser()
userStore.value = user


const { data: courseData, refresh } = await useFetch("/api/courses")
const accessCodeAction = (async (e) => {
  const formTarget = e.currentTarget as HTMLFormElement
  const formData = new FormData(formTarget)
  const accessCode = formData.get("access-code")

  const postReq = await fetch("/api/access-code", {
    method: "POST",
    body: JSON.stringify({ accessCode })
  })
  if (!postReq.ok) return
  refresh()
}) satisfies EventListener
</script>
<template>
  <nav>

    <div>
      <h2>
        <NuxtLink to="/">LCCT</NuxtLink>
      </h2>
    </div>
    <div>
      <ul class="nav-sublinks">
        <li>
          <button @click="coursesOpen = !coursesOpen">Courses</button>
        </li>
      </ul>
    </div>
  </nav>
  <div class="course-modal" v-if="coursesOpen">
    <button @click="accessCodeFormOpen = !accessCodeFormOpen">Join Course</button>
    <form v-if="accessCodeFormOpen" @submit.prevent="accessCodeAction">
      <input type="text" id="access-code" placeholder="Enter Access code" name="access-code" />
      <button type="submit">Submit</button>
    </form>
    <div v-if="courseData !== null && courseData.courses.length !== 0">
      Your courses
      <div v-for="courses in courseData.courses">
        <NuxtLink :to="`/courses/${courses._id}`">{{ courses.name }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
ul {
  list-style-type: none;
  display: flex;
  /* align-items:center; */
  padding: 0;
}

nav {
  display: flex;
  align-items: center;
  padding: .5rem 2rem;
  background: hsl(0, 0%, 10%);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

nav button {
  background: none;
  border: none;
  outline: none;
  padding: 0;
  color: white;
  font-family: inherit;
  font-size: inherit;
}

nav a {
  color: white;
  text-decoration: none;
}

nav h2 {
  margin: 0;
}

nav>* {
  margin-right: 1.25rem;
}

.nav-sublinks>* {
  margin-right: .5rem;
}
</style>