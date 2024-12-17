// src/stores/userStore.js
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Stores the authenticated user's data
  }),

  getters: {
    username(state) {
      const derivedUsername = state.user?.username || state.user?.email || 'Guest';
      console.log('Derived Username:', derivedUsername);
      return derivedUsername;
    },
  },

  actions: {
    async fetchUser() {
      try {
        const { data: session, error } = await supabase.auth.getSession();
    
        if (error) throw error;
    
        if (session && session.user) {
          console.log('Session User:', session.user);
    
          // Fetch the username from the profiles table
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', session.user.id)
            .single();
    
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            throw profileError;
          }
    
          console.log('Fetched Profile:', profile);
    
          // Store the user and username
          this.user = {
            ...session.user,
            username: profile.username, // Add the fetched username
          };
    
          console.log('User Stored in Pinia:', this.user);
        } else {
          this.user = null;
          console.log('No session available');
        }
      } catch (error) {
        console.error('Error in fetchUser:', error);
      }
    },

    setUser(user) {
      this.user = user;
    },

    clearUser() {
      this.user = null;
    },
  },
});
