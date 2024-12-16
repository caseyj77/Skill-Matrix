import CreateAccountForm from '@/components/CreateAccountForm.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AccountProfileForm from '@/components/AccountProfileForm.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/create-account',
      name: 'createAccount',
      component: CreateAccountForm,
    },
    {
      path: '/user-profile',
      name: 'userProfile',
      component: AccountProfileForm,
    },
  ],
})

export default router
