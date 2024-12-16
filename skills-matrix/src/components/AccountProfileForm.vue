<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const profile = ref({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  company_name: '',
  role: '',
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Fetch the user's profile
const fetchProfile = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw sessionError

    const user = session?.user
    if (!user) throw new Error('No user logged in')

    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (error) throw error

    profile.value = data
  } catch (error) {
    errorMessage.value = error.message || 'Failed to load profile.'
  } finally {
    loading.value = false
  }
}

// Update the user's profile
const updateProfile = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw sessionError

    const user = session?.user
    if (!user) throw new Error('No user logged in')

    const { error } = await supabase.from('profiles').update(profile.value).eq('id', user.id)
    if (error) throw error

    successMessage.value = 'Profile updated successfully!'
  } catch (error) {
    errorMessage.value = error.message || 'Failed to update profile.'
  } finally {
    loading.value = false
  }
}

// Fetch profile data on component mount
onMounted(fetchProfile)
</script>

<template>
  <div>
    <h1>Profile Page</h1>

    <div v-if="loading">Loading...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <form v-else @submit.prevent="updateProfile">
      <label for="username">Username:</label>
      <input v-model="profile.username" type="text" id="username" />

      <label for="email">Email:</label>
      <input v-model="profile.email" type="email" id="email" disabled />

      <label for="first_name">First Name:</label>
      <input v-model="profile.first_name" type="text" id="first_name" />

      <label for="last_name">Last Name:</label>
      <input v-model="profile.last_name" type="text" id="last_name" />

      <label for="phone_number">Phone Number:</label>
      <input v-model="profile.phone_number" type="text" id="phone_number" />

      <label for="company_name">Company Name:</label>
      <input v-model="profile.company_name" type="text" id="company_name" />

      <label for="role">Role:</label>
      <select v-model="profile.role" id="role">
        <option value="user">User</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" :disabled="loading">Save</button>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </form>
  </div>
</template>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}

label {
  margin-top: 10px;
  font-weight: bold;
}

input,
select {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 15px;
  padding: 10px;
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #aaa;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
