import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService, type RegisterForm } from '../services/authService'
import { useAppToast } from '../composables/useAppToast'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

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
  const listAgreements = ref<any>()
  const router = useRouter();

  const setToken = (value: string) => {
    token.value = value
    Cookies.set('token', value)
  }

  const clearToken = () => {
    token.value = null
    Cookies.remove('token')
    Cookies.remove('user')
    Cookies.remove('role')
  }

  const initialize = async () => {
    loading.value = true
    try {
      const response = await authService.initialize()
      userLogin.value = await response.data.user
      Cookies.set('user', JSON.stringify(userLogin.value));
    } catch (err: any) {
      if (err.status == 401){
        logoutMember();
        router.push('/login')
      }
      showToast('error', err.response.data.message)
    } finally {
      loading.value = false
    }
  }

  const registerMember = async (payload: any) => {
    loading.value = true
    try {
      const { data } = await authService.createMember(payload)
      showToast('success', data.message || 'Registration successful')
      return true
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Registration failed')
      error.value = err.message || 'Failed to register'
      return false
    } finally {
      loading.value = false
    }
  }

  const requestForget = async (payload: any) => {
    loading.value = true
    try {
      const { data } = await authService.requestForget(payload)
      return true
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Registration failed')
      error.value = err.message || 'Failed to register'
      return false
    } finally {
      loading.value = false
    }
  }

  const changePassword = async (code: string, payload: any) => {
    loading.value = true
    try {
      const { data } = await authService.changePassword(code, payload)
      return true
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Registration failed')
      error.value = err.message || 'Failed to register'
      return false
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
      Cookies.set('role', 'member')
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
      if (data.value.data.users.role_id == 2){
        initialize()
        setToken(data.value.data.tokenData.token)
        showToast('success', data.value.message)
        isLogin.value = true;
        loginRole.value = 'admin';
        Cookies.set('role', 'admin')
      } else {
        showToast('error', 'Akun anda bukan administrator')
        return false
      }
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

  const agreements = async () => {
    loading.value = true
    try {
      const response = await authService.getAgreements()
      listAgreements.value = await response.data
      Cookies.set('user', JSON.stringify(userLogin.value));
    } catch (err: any) {
      showToast('error', err.response.data.message)
    } finally {
      loading.value = false
    }
  }


  return {
    members,
    loading,
    error,
    data,
    isLogin,
    loginRole,
    userLogin,
    listAgreements,
    initialize,
    agreements,
    loginAdmin,
    registerMember,
    loginMember,
    logoutMember,
    requestForget,
    changePassword,
    token,
    setToken,
    clearToken
  }
})
