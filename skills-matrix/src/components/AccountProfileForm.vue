<script>
import { supabase } from '@/lib/supabaseClient';
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      profile: null, // Holds the profile data fetched from the database
      loading: true, // Tracks whether the data is being loaded
      errorMessage: '', // Tracks errors during the fetch process
    };
  },
  async mounted() {
    // Fetch profile data when the component mounts
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const userStore = useUserStore();
        const user = userStore.user;

        if (!user) {
          throw new Error('User is not logged in.');
        }

        // Fetch profile data from Supabase
        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

        if (error) {
          throw error;
        }

        this.profile = data; // Save profile data to the state
      } catch (error) {
        this.errorMessage = error.message || 'An error occurred while fetching profile data.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Profile</h1>

    <!-- Display Loading Indicator -->
    <div v-if="loading">Loading profile...</div>

    <!-- Display Error Message -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- Display Profile Information -->
    <div v-else-if="profile" class="profile">
      <p><strong>Username:</strong> {{ profile.username }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
      <p><strong>First Name:</strong> {{ profile.first_name }}</p>
      <p><strong>Last Name:</strong> {{ profile.last_name }}</p>
      <p><strong>Phone Number:</strong> {{ profile.phone_number }}</p>
      <p><strong>Company Name:</strong> {{ profile.company_name }}</p>
      <p><strong>Role:</strong> {{ profile.role }}</p>

      <!-- Placeholder Update Button -->
      <button @click="handleUpdateClick">Update Profile</button>
    </div>

    <!-- Handle Case Where Profile is Not Available -->
    <div v-else>
      <p>No profile data available.</p>
    </div>
  </div>
</template>

<style scoped>
/* Style for the profile section */
.profile {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.error {
  color: red;
  margin-top: 10px;
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

button:hover {
  background-color: #556781;
}
</style>
