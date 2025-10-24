import { defineStore } from 'pinia'
import { ref } from 'vue'
import { journalService } from '../services/journalService'

export const useJournalStore = defineStore('journal', () => {
  const journals = ref<any>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getAllJournal = async (userId: number) => {
    loading.value = true
    try {
      const response = await journalService.getAll(userId)
      journals.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get all forum'
    } finally {
      loading.value = false
    }
  }

  return {
    journals,
    loading,
    error,
    getAllJournal,
  }
})
