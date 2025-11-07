import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import AdminLogin from '../pages/auth/LoginAdmin.vue'
import Login from '../pages/auth/Login.vue'
import Forgot from '../pages/auth/Forgot.vue'
import Reset from '../pages/auth/Reset.vue'
import Register from '../pages/auth/Register.vue'

import MemberLayout from '../pages/layout/MemberLayout.vue'
import MemberDashboard from '../pages/member/Dashboard.vue'
import MemberSummary from '../pages/member/account/SummaryMember.vue'
import MemberProfile from '../pages/member/account/Profile.vue'
import MemberJournal from '../pages/member/account/Journal.vue'
import MemberForum from '../pages/member/discussion/Discussion.vue'
import MemberSession from '../pages/member/session/Session.vue'
import MemberPreTest from '../pages/member/test/PreTest.vue'
import MemberPostTest from '../pages/member/test/PostTest.vue'
import MemberAttemptTest from '../pages/member/test/AttempTest.vue'

import AdminLayout from '../pages/layout/AdminLayout.vue'
import DashboardMain from '../pages/admin/dashboard/Main.vue'

import CreateRole from "../pages/admin/master/role/Create.vue"
import ListRole from "../pages/admin/master/role/List.vue"

import CreateUser from "../pages/admin/master/user/Create.vue"
import ListUser from "../pages/admin/master/user/List.vue"

import CreateMember from "../pages/admin/member/Create.vue"
import ListMember from "../pages/admin/member/List.vue"

import ListReport from "../pages/admin/report/Lists.vue"
import TestReport from "../pages/admin/report/Test.vue"
import JournalReport from "../pages/admin/report/Journal.vue"

import CreateTest from "../pages/admin/master/test/Create.vue"
import ListTest from "../pages/admin/master/test/List.vue"
import QuestionTest from "../pages/admin/master/test/Question.vue"

import CreatePractice from "../pages/admin/master/practice/Create.vue"
import ListPractice from "../pages/admin/master/practice/List.vue"

const routes = [
  { path: '/', name: 'Home', component: Login, meta: { guest: true } },
  { path: '/login', name: 'Login', component: Login, meta: { guest: true } },
  { path: '/password/request', name: 'Forgot', component: Forgot, meta: { guest: true } },
  { path: '/password/recovery', name: 'Reset', component: Reset, meta: { guest: true } },
  { path: '/admin/login', name: 'Admin Login', component: AdminLogin, meta: { guest: true } },
  { path: '/register', name: 'Register', component: Register, meta: { guest: true } },

  {
    path: '/member',
    component: MemberLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'Dashboard', component: MemberDashboard },
      { path: 'summary', name: 'Summary', component: MemberSummary },
      { path: 'profile', name: 'Profile', component: MemberProfile },
      { path: 'journal', name: 'Journal', component: MemberJournal },
      { path: 'forum/:code', name: 'Forum Dikusi', component: MemberForum },
      { path: 'session/:code', name: 'Sesi', component: MemberSession },
      { path: 'pre-test/:attempt', name: 'Pre Test', component: MemberPreTest },
      { path: 'post-test/:attempt', name: 'Post Test', component: MemberPostTest },
      { path: 'attempt-test/:type', name: 'Attempt Test', component: MemberAttemptTest },
    ]
  },

  {
    path: '/admin',
    component: AdminLayout,
    // meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'Dashboard General Admin', component: DashboardMain },
      { path: 'master/role', name: 'Role', component: ListRole },
      { path: 'master/role/create', name: 'Role Create', component: CreateRole },
      { path: 'master/user', name: 'User', component: ListUser },
      { path: 'master/user/create', name: 'User Create', component: CreateUser },
      { path: 'master/test', name: 'Test', component: ListTest },
      { path: 'master/test/create', name: 'Test Create', component: CreateTest },
      { path: 'master/test/question', name: 'Question Test', component: QuestionTest },
      { path: 'master/practice', name: 'Practice', component: ListPractice },
      { path: 'master/practice/create', name: 'Practice Create', component: CreatePractice },
      { path: 'data/member', name: 'Member', component: ListMember },
      { path: 'data/member/create', name: 'Member Create', component: CreateMember },
      { path: 'report', name: 'Member Report', component: ListReport },
      { path: 'report/test/:type/:id', name: 'Member Report Detail', component: TestReport },
      { path: 'report/journal/:id', name: 'Member Report Journal', component: JournalReport },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  console.log(from);

  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else if (to.meta.guest && auth.token) {
    next('/member/dashboard')
  } else {
    next()
  }
})

export default router
