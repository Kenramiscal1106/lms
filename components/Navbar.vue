<script setup lang="ts">
import { useCurrentUser } from "~~/composables/authUser";

const route = useRoute();
const coursesOpen = ref(false);
const user = await useUserSession();
const userStore = useCurrentUser();
userStore.value = user;

const logOut = async () => {
  await fetch("/api/logout");
  window.location.replace("/login");
};

watch(route, () => {
  if (!coursesOpen.value) {
    return;
  }
  coursesOpen.value = false;
});
</script>
<template>
  <nav
    class="fixed left-0 top-0 flex w-full items-center bg-neutral-900 px-8 py-3"
  >
    <div>
      <h2>
        <NuxtLink to="/">LCCT</NuxtLink>
      </h2>
    </div>
    <div v-show="user.isLoggedIn">
      <ul class="mr-2">
        <li>
          <NavbarItem @click="coursesOpen = true">Courses</NavbarItem>
        </li>
      </ul>
    </div>
    <div class="ml-auto" v-show="user.isLoggedIn">
      <NavbarItem @click="logOut">Log out</NavbarItem>
    </div>
  </nav>
  <div
    class="absolute left-0 top-0 h-full w-full bg-black bg-opacity-30"
    v-if="coursesOpen"
    @click.self="coursesOpen = !coursesOpen"
  >
    <CourseModal />
  </div>
</template>
<style scoped>
ul {
  list-style-type: none;
  display: flex;
  /* align-items:center; */
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
}

nav h2 {
  margin: 0;
}

nav > * {
  margin-right: 1.25rem;
}
</style>
