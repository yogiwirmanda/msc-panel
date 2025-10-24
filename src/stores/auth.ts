import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService, type RegisterForm } from '../services/authService'
import { useAppToast } from '../composables/useAppToast'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
  const members = ref<RegisterForm[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<any>(null)
  const { showToast } = useAppToast()
  const token = ref<string | null>(Cookies.get('token') || null)
  const isLogin = ref(false)
  const loginRole = ref('')
  const userLogin = ref<any>()

  const setToken = (value: string) => {
    token.value = value
    Cookies.set('token', value)
  }

  const clearToken = () => {
    token.value = null
    Cookies.remove('token')
    Cookies.remove('user')
  }

  const initialize = async () => {
    loading.value = true
    try {
      const response = await authService.initialize()
      userLogin.value = await response.data.user
      Cookies.set('user', JSON.stringify(userLogin.value));
    } catch (err: any) {
      showToast('error', err.response.data.message)
    } finally {
      loading.value = false
    }
  }

  const registerMember = async (payload: any) => {
    loading.value = true
    try {
      await authService.createMember(payload)
      showToast('success', data.value.message)
    } catch (err: any) {
      // showToast('error', err.response.data.message)
      error.value = err.message || 'Failed to create role'
    } finally {
      loading.value = false
    }
  }

  const loginMember = async (payload: any) => {
    loading.value = true
    try {
      const response = await authService.loginMember(payload)
      data.value = response
      initialize()
      setToken(data.value.data.tokenData.token)
      showToast('success', data.value.message)
      isLogin.value = true;
    } catch (err: any) {
      showToast('error', err.response.data.message)
      error.value = err.message || 'Failed to create role'
      isLogin.value = false;
      loginRole.value = 'member';
    } finally {
      loading.value = false
    }
  }

  const loginAdmin = async (payload: any) => {
    loading.value = true
    try {
      const response = await authService.loginMember(payload)
      data.value = response
      initialize()
      setToken(data.value.data.tokenData.token)
      showToast('success', data.value.message)
      isLogin.value = true;
      loginRole.value = 'admin';
    } catch (err: any) {
      showToast('error', err.response.data.message)
      error.value = err.message || 'Failed to create role'
      isLogin.value = false;
    } finally {
      loading.value = false
    }
  }

  const logoutMember = async () => {
    clearToken()
  }


  return {
    members,
    loading,
    error,
    data,
    isLogin,
    loginRole,
    userLogin,
    initialize,
    loginAdmin,
    registerMember,
    loginMember,
    logoutMember,
    token,
    setToken,
    clearToken
  }
})
