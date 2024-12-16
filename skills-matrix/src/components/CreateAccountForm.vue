<script setup>
/* eslint-disable no-unused-vars */
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errors = ref({})
const successMessage = ref('')

const handleSignUp = async () => {
  errors.value = {} // Reset errors

  if (!email.value.trim()) errors.value.email = 'Email is required'
  if (!password.value.trim()) errors.value.password = 'Password is required'
  if (password.value.length < 6) errors.value.password = 'Password must be at least 6 characters'

  if (Object.keys(errors.value).length > 0) return

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })

    if (error) {
      errors.value.general = error.message
    } else {
      successMessage.value =
        'Account created successfully! Please check your email for confirmation.'
    }
  } catch (err) {
    errors.value.general = 'An unexpected error occurred.'
  }
}
</script>

<template>
  <form @submit.prevent="handleSignUp">
    <label for="email">Email:</label>
    <input v-model="email" type="email" id="email" required />
    <p v-if="errors.email">{{ errors.email }}</p>

    <label for="password">Password:</label>
    <input v-model="password" type="password" id="password" required />
    <p v-if="errors.password">{{ errors.password }}</p>

    <button type="submit">Sign Up</button>
    <p v-if="errors.general" class="error-message">{{ errors.general }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </form>
</template>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

/* Styling the form sections container */
.form-section-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background-color: #f9f9f9;
}

/* Styling each form section */
.form-section {
  flex: 1;
  max-width: 500px;
}

.user-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

/* Adjusting headings and labels */
.user-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
  font-weight: 600;
}

.user-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.user-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  color: #2c3e50;
}

.user-form input:focus {
  border-color: #00c0e4; /* Change border color on focus */
  box-shadow: 0 0 5px rgba(0, 192, 228, 0.5); /* Add subtle shadow on focus */
  outline: none; /* Remove default outline */
}

/* Styling the button */
.user-form button {
  width: 100%;
  padding: 10px;
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-form button:hover {
  background-color: #42b883;
}
</style>
