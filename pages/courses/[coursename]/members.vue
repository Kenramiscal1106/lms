<script setup lang='ts'>
const courseStore = useCurrentCourse();
</script>
<template>
  <h1>Members</h1>
  <table>
    <tbody>
      <tr>
        <th>name</th>
        <th>username</th>
      </tr>
      <template v-if="courseStore !== null">
        <tr v-for="member in courseStore.members">
          <td>{{ member.firstName + " " + member.lastName }}</td>
          <td>{{ member.username }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<style scoped></style>