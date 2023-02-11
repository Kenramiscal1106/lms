<script setup lang='ts'>
const coursesOpen = ref(false);
const accessCodeFormOpen = ref(false);
const { data: courseData, error } = await useFetch("/api/courses")

const accessCodeAction = ((e) => {
  const formTarget = e.currentTarget as HTMLFormElement
  const formData = new FormData(formTarget)
  const username = formData.get("username")
  const password = formData.get('password')

  /* const postReq = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
  const postRes = await postReq.json()
  if (postReq.status === 400) {
    formResult.value = {
      success: false,
      type: "incorrect",
      message: "incorrect username or password"
    }
    return
  }
  if (postReq.status === 500) {
    formResult.value = {
      success: false,
      type: "incorrect",
      message: "internal server error"
    }
    return
  }
  const url = new URLSearchParams(window.location.search)
 */
  // // alert("successfully logged in")
  // window.location.pathname = "/"
}) satisfies EventListener
</script>
<template>
  <nav>

    <div>
      <h2>LCCT</h2>
    </div>
    <div>
      <ul class="nav-sublinks">
        <li>
          <button @click="coursesOpen = !coursesOpen">Courses</button>
          <!-- <NuxtLink to="/courses">Courses</NuxtLink> -->
        </li>
        <li>
          <NuxtLink to="/groups">Groups</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/grades">Grades</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
  <div class="course-modal" v-if="coursesOpen">
    <button @click="accessCodeFormOpen = !accessCodeFormOpen">Join Course</button>
    <form v-if="accessCodeFormOpen">
      <input type="text" id="access-code" placeholder="Enter Access code" />
      <button type="submit">Submit</button>
    </form>
    <div v-if="courseData !== null && courseData.courses.length !== 0">
      <div v-for="courses in courseData">
        <div>{{ courses }}</div>
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