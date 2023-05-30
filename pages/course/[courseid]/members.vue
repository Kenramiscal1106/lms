<script setup lang='ts'>
const route = useRoute()
const { data } = useFetch(`/api/course/${route.params.courseid}/members`)
</script>
<template>
  <div>
    <h2>Members</h2>
    <table>
      <tbody>
        <tr>
          <th>name</th>
          <th>username</th>
        </tr>
        <template v-if="data">
          <tr v-for="member in data.members">
            <td>{{ member.firstName + " " + member.lastName }}</td>
            <td>{{ member.username }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<style scoped></style>