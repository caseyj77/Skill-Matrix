<script>
import { supabase } from '@/lib/supabaseClient';
import { useUserStore } from '@/stores/userStore';

export default {
  computed: {
  username() {
    const userStore = useUserStore();
    console.log('User Store in NavBarHeader:', userStore.user); // Debugging log
    console.log('Derived Username in NavBarHeader:', userStore.username); // Debugging log
    return userStore.username;
  },
},
  methods: {
    async logout() {
      await supabase.auth.signOut();
      const userStore = useUserStore();
      userStore.clearUser();
      this.$router.push('/');
    },
  },
};
</script>




<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/user-profile">Profile</router-link></li>
      <li><router-link to="/create-account">Create Account</router-link></li>
      <li><router-link to="/login">Login</router-link></li>

      <!-- Display Username or Default to Guest -->
      <li>
        <span v-if="username">Hello, {{ username }}</span>
        <span v-else>Hello, Guest</span>
      </li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

<style scoped>
/* Add some basic styling for the navbar */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px;
}

ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: white;
  text-decoration: none;
}

button {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #ff6666;
}
</style>