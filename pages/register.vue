<script setup lang="ts">

const passwordRef = ref("")
const confirmPasswordRef = ref("")
const passwordMatch = ref<null | boolean>(null)
const handleSubmit = (async (e) => {
  const formData = new FormData(e.currentTarget as HTMLFormElement)
  const firstname = formData.get("firstname")
  const lastname = formData.get("lastname")
  const password = formData.get('password')

  if (passwordRef.value !== confirmPasswordRef.value) {
    passwordMatch.value = false
    return
  }
  passwordMatch.value = true
  const postReq = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ firstname, lastname, password })
  });
  const postRes = await postReq.json()
  console.log(postRes.success)
  if (postRes.success) {
    console.log("successfully registered")
    navigateTo({
      path: "/login"
    })
  }
  console.log({ firstname, lastname, password, postRes })
}) satisfies EventListener

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Register to LMS</h1>
    <label for="firstname">First name</label>
    <input type="text" name="firstname" id="firstname"> <br>
    <label for="lastname">Last name</label>
    <input type="text" name="lastname" id="lastname"> <br>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model="passwordRef"><br>
    <label for="confirm-password">Confirm Password</label>
    <input type="password" name="password" id="confirm-password" v-model="confirmPasswordRef" /><br>
    <div v-if="typeof passwordMatch === 'boolean' && !passwordMatch">
      Password doesn't match
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
input {
  border: 1px solid black;
  padding: .5rem;
}
</style>