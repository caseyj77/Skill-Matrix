<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { RouterLink } from 'vue-router'

const user = ref({ username: 'Guest' })// this doesnt seem right to me

// Function to fetch the user's profile from Supabase
const fetchUser = async () => {
  try {
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw new Error('Error fetching session: ' + sessionError.message)

    if (session?.user?.id) {
      const userId = session.user.id

      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single()

      if (error) throw new Error('Error fetching profile: ' + error.message)

      if (data?.username) {
        user.value.username = data.username
        console.log('Username updated:', data.username)
      }
    }
  } catch (error) {
    console.error('fetchUser error:', error.message)
  }
}

// Listen for Supabase auth state changes
const listenForAuthChanges = () => {
  const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state change event:', event, session)

    if (event === 'SIGNED_IN' && session?.user) {
      console.log('User signed in:', session.user)
      await fetchUser()
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out')
      user.value.username = 'Guest'
    } else if (event === 'INITIAL_SESSION' && session?.user) {
      console.log('Initial session detected:', session.user)
      await fetchUser() // Fetch user info if an initial session exists
    }
  })

  onUnmounted(() => {
    subscription?.unsubscribe()
  })
}


// Check session on page load and listen for auth changes
onMounted(() => {
  const checkSession = async () => {
    const { data: session } = await supabase.auth.getSession()
    console.log('Session on page load:', session)

    if (session?.user) {
      await fetchUser() // Fetch user info if a session exists
    }
  }

  checkSession() // Check session when the component mounts
  listenForAuthChanges() // Listen for auth state changes
})

</script>

<template>
  <div>
    <nav>
      <div id="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <a href="#">Skills</a>
        <a href="#">Admin</a>
      </div>
      <div id="user">
        <p>
          Hello <RouterLink to="/user-profile">{{ user.username }}</RouterLink>
        </p>
      </div>
    </nav>
  </div>
</template>

<style lang="css" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #35495e;
  color: white;
}

#nav-links a {
  margin-right: 15px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

#nav-links a:hover {
  text-decoration: underline;
}

#user p {
  margin: 0;
  font-size: 16px;
}
</style>
