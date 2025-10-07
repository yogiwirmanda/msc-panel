import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService, type RegisterForm } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const members = ref<RegisterForm[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<any>(null)

  const registerMember = async (payload: any) => {
    loading.value = true
    try {
      await authService.createMember(payload)
    } catch (err: any) {
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
    } catch (err: any) {
      error.value = err.message || 'Failed to create role'
    } finally {
      loading.value = false
    }
  }


  return {
    members,
    loading,
    error,
    data,
    registerMember,
    loginMember
  }
})
