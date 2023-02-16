<script setup lang='ts'>
const { data } = defineProps<{
  data: any
}>()
</script>
<template>
  <h1>Members</h1>
  <table>
    <tbody>
      <tr>
        <th>name</th>
        <th>username</th>
      </tr>
      <tr v-for="member in data.members">
        <td>{{ member.firstName + " " + member.lastName }}</td>
        <td>{{ member.username }}</td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>

</style>