<script>
import { supabase } from '@/lib/supabaseClient';
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      if (error) {
        console.error('Login failed:', error.message);
      } else {
        const userStore = useUserStore();
        userStore.setUser(user); // Update the Pinia store
        console.log('Login successful:', user);
        this.$router.push('/user-profile'); // Navigate to the profile page
      }
    },
  },
};
</script>


<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
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
