import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService, type UserItem } from '../services/userService'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(10)
  const totalPages = ref(0)
  const detailUser = ref<UserItem | null>(null)

  const fetchUsers = async (newPage = 1) => {
    loading.value = true
    error.value = null

    try {
      const response = await userService.getUsers(newPage, pageSize.value)
      users.value = response.data.items
      total.value = response.data.total
      page.value = response.data.page
      totalPages.value = response.data.totalPages
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }

  const getUserDetail = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const data = await userService.getUserById(id)
      console.log(data);
      detailUser.value = data
      return data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch role detail'
    } finally {
      loading.value = false
    }
  }

  const addUser = async (role: Partial<UserItem>) => {
    loading.value = true
    try {
      await userService.createUser(role)
      await fetchUsers(page.value)
    } catch (err: any) {
      error.value = err.message || 'Failed to create role'
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (userId: any, payload: Partial<UserItem>) => {
    loading.value = true
    try {
      await userService.updateUser(userId, payload)
      await fetchUsers(page.value)
    } catch (err: any) {
      error.value = err.message || 'Failed to update role'
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: number) => {
    loading.value = true
    try {
      await userService.deleteUser({ id })
      await fetchUsers(page.value)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete role'
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    total,
    page,
    pageSize,
    totalPages,
    loading,
    error,
    detailUser,
    fetchUsers,
    getUserDetail,
    addUser,
    updateUser,
    deleteUser,
  }
})
