<script setup lang="js">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const router = useRouter()

// Reactive variables for login inputs
const username = ref('')
const password = ref('')

// Error message state
const errorMessage = ref('')

// Login function
const login = async () => {
  errorMessage.value = ''

  try {
    // Supabase sign-in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username.value, // Assuming username is an email
      password: password.value,
    })

    if (error) throw error

    // Redirect to home page on success
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message || 'Login failed. Please try again.'
  }
}
</script>


<template>
  <section class="form-section-container">
    <div class="form-section">
      <form class="user-form" @submit.prevent="login">
        <h2>Login</h2>

        <label for="username">Email:</label>
        <input
          v-model="username"
          type="text"
          id="username"
          name="username"
          required
          placeholder="Enter your email"
        />

        <label for="password">Password:</label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          required
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <p class="create-account-text">
          <br />
          Don't have an account? Create one <RouterLink to="/create-account">here</RouterLink>.
        </p>
      </form>
    </div>
  </section>
</template>


<style scoped>
/* Basic reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body {
  background-color: #f9f9f9;
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

.user-form button:active {
  background-color: #2c3e50; /* Slightly darker shade */
  transform: scale(0.98); /* Slightly "presses" the button */
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .form-section {
    padding: 15px;
    max-width: 100%;
  }
  .user-form button {
    font-size: 14px;
  }
}

/* Invalid input styling */
.user-form input:invalid {
  border-color: #e74c3c; /* Red border for invalid inputs */
}
</style>
