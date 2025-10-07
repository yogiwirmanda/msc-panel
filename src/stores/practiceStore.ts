import { defineStore } from 'pinia'
import { ref } from 'vue'
import { practiceService, type PracticeInterface } from '../services/practiceService'

export const usePracticeStore = defineStore('practice', () => {
  const practice = ref<PracticeInterface>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const detailPractice = async (code: any) => {
    loading.value = true
    try {
      const response = await practiceService.getPractice(code)
      practice.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to create role'
    } finally {
      loading.value = false
    }
  }

  return {
    practice,
    loading,
    error,
    detailPractice,
  }
})
