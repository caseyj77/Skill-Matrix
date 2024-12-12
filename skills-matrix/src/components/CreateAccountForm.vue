<script setup lang="js">
import { ref } from 'vue';

// create Reactive Variables to hold information entered
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref({});

const validateForm = () => {
  errors.value = {};

  if (!username.value.trim()) errors.value.username = 'Username is required';
  if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errors.value.email = 'Invalid email address';
  if (password.value.length < 6) errors.value.password = 'Password must be at least 6 characters';
  if (password.value !== confirmPassword.value) errors.value.confirmPassword = 'Passwords do not match';

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    alert('Form submitted successfully!');
    // Perform form submission logic here
  }
};

</script>

<template>
    <main class="content">
      <section class="form-section-container">
        <div class="form-section">
          <form class="user-form" @submit="handleSubmit">
            <h2>Create Account</h2>
    
            <label for="username">Username:</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
            />
            <p v-if="errors.username" class="error-message">{{ errors.username }}</p>
    
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
            />
            <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
    
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
            />
            <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
    
            <label for="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              required
            />
            <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
    
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>
    </main>
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