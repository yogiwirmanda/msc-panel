import { defineStore } from 'pinia'
import { ref } from 'vue'
import { dashboardService } from '../services/dashboardService'

export const useDashboardStore = defineStore('dashboard', () => {
  const dashboards = ref<any>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getDashboard = async (userId: number) => {
    loading.value = true
    try {
      const response = await dashboardService.getAll(userId)
      dashboards.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get all forum'
    } finally {
      loading.value = false
    }
  }

  return {
    dashboards,
    loading,
    error,
    getDashboard,
  }
})
