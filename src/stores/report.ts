import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reportService } from '../services/report'

export const useReportStore = defineStore('report', () => {
  const reportData = ref<any>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const test = async (type: string, userId:number) => {
    loading.value = true
    try {
      const response = await reportService.getReport(type, userId)
      reportData.value = response
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to get detail ques template'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    reportData,
    loading,
    error,
    test,
  }
})
