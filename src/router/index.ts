import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Login from '../pages/auth/Login.vue'

import MemberLayout from '../pages/layout/MemberLayout.vue'
import MemberDashboard from '../pages/member/Dashboard.vue'
import MemberProfile from '../pages/member/account/Profile.vue'
import MemberJournal from '../pages/member/account/Journal.vue'
import MemberForum from '../pages/member/discussion/Discussion.vue'
import MemberSession from '../pages/member/session/Session.vue'

import DatatableView from '../pages/admin/base/Datatable.vue'
import AdminLayout from '../pages/layout/AdminLayout.vue'

const routes = [
  { path: '/', name: 'Home', component: Login, meta: { guest: true } },
  { path: '/login', name: 'Login', component: Login, meta: { guest: true } },

  {
    path: '/member',
    component: MemberLayout,
    // meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'Dashboard', component: MemberDashboard },
      { path: 'profile', name: 'Profile', component: MemberProfile },
      { path: 'journal', name: 'Journal', component: MemberJournal },
      { path: 'discussion', name: 'Forum Dikusi', component: MemberForum },
      { path: 'session', name: 'Sesi', component: MemberSession },
    ]
  },

  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'datatable', name: 'Datatable', component: DatatableView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else if (to.meta.guest && auth.token) {
    next('/member/dashboard')
  } else {
    next()
  }
})

export default router
