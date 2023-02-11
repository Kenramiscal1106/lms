<script setup lang='ts'>

</script>
<template>
  <nav>

    <div>
      <h2>LCCT</h2>
    </div>
    <div>
      <ul class="nav-sublinks">
        <li>
          <NuxtLink to="/courses">Courses</NuxtLink>
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
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
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