import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'

export interface User {
  id: number
  name: string
  email: string
}

interface LoginResponse {
  token: string
  user: User
}

interface RegisterResponse {
  message: string
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(credentials: { email: string; password: string }): Promise<boolean> {
      try {
        const { data } = await axios.post<LoginResponse>('/api/login', credentials)
        this.token = data.token
        this.user = data.user

        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

        return true
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        throw error.response?.data?.message || 'Login failed'
      }
    },

    async register(form: { name: string; email: string; password: string }): Promise<string> {
      try {
        const { data } = await axios.post<RegisterResponse>('/api/register', form)
        return data.message
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        throw error.response?.data?.message || 'Register failed'
      }
    },

    async fetchUser(): Promise<void> {
      if (!this.token) return
      try {
        const { data } = await axios.get<User>('/api/me')
        this.user = data
      } catch {
        this.logout()
      }
    },

    logout(): void {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
  },
})
