import { defineStore } from 'pinia'
import { ref } from 'vue'
import { roleService, type RoleItem } from '../services/roleService'

export const useRoleStore = defineStore('role', () => {
  const roles = ref<RoleItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(10)
  const totalPages = ref(0)
  const selectedRole = ref<RoleItem | null>(null)

  const fetchRoles = async (newPage = 1) => {
    loading.value = true
    error.value = null

    try {
      const response = await roleService.getRoles(newPage, pageSize.value)
      roles.value = response.data.items
      total.value = response.data.total
      page.value = response.data.page
      totalPages.value = response.data.totalPages
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch roles'
    } finally {
      loading.value = false
    }
  }

  const getRoleDetail = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const data = await roleService.getRoleById(id)
      selectedRole.value = data
      return data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch role detail'
    } finally {
      loading.value = false
    }
  }

  const addRole = async (role: Partial<RoleItem>) => {
    loading.value = true
    try {
      await roleService.createRole(role)
      await fetchRoles(page.value)
    } catch (err: any) {
      error.value = err.message || 'Failed to create role'
    } finally {
      loading.value = false
    }
  }

  const updateRole = async (role: Partial<RoleItem>) => {
    loading.value = true
    try {
      await roleService.updateRole(role)
      await fetchRoles(page.value)
    } catch (err: any) {
      error.value = err.message || 'Failed to update role'
    } finally {
      loading.value = false
    }
  }

  const deleteRole = async (id: number) => {
    loading.value = true
    try {
      await roleService.deleteRole({ id })
      await fetchRoles(page.value)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete role'
    } finally {
      loading.value = false
    }
  }

  return {
    roles,
    total,
    page,
    pageSize,
    totalPages,
    loading,
    error,
    selectedRole,
    fetchRoles,
    getRoleDetail,
    addRole,
    updateRole,
    deleteRole,
  }
})
