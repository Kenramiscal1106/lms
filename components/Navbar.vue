<script setup lang='ts'>
import { useCurrentUser } from '~~/composables/authUser';

const coursesOpen = ref(false);
const accessCodeFormOpen = ref(false);
const user = await useUserSession()
const userStore = useCurrentUser()
userStore.value = user

const logOut = async () => {
  await fetch('/api/logout');
  window.location.replace('/login')
}
</script>
<template>
  <nav class="flex items-center px-8 py-3 bg-neutral-900 fixed w-full top-0 left-0">

    <div>
      <h2>
        <NuxtLink to="/">LCCT</NuxtLink>
      </h2>
    </div>
    <div v-show="user.isLoggedIn">
      <ul class="mr-2">
        <li>
          <button @click="coursesOpen = !coursesOpen">Courses</button>
        </li>
      </ul>
    </div>
    <div class="ml-auto" v-show="user.isLoggedIn">
      <button @click="logOut">Log out</button>
    </div>
  </nav>
  <div class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-30" v-if="coursesOpen"
    @click.self="coursesOpen = !coursesOpen">
    <CourseModal :accessCodeFormOpen="accessCodeFormOpen" :coursesOpen="coursesOpen" />
  </div>
</template>
<style scoped>
ul {
  list-style-type: none;
  display: flex;
  /* align-items:center; */
  padding: 0;
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
</style>