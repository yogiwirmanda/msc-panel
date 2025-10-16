import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PracticeDetailSection, PracticeInterface, PracticeJournal, PracticeSteps } from '../types/practice'
import { practiceService } from '../services/practiceService'

export const usePracticeStore = defineStore('practice', () => {
  const practice = ref<PracticeInterface>()
  const stepPractice = ref<PracticeSteps>()
  const detailSection = ref<PracticeDetailSection>()
  const detailJournal = ref<PracticeJournal>()
  const updateStepResponse = ref<any>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const detailPractice = async (code: any) => {
    loading.value = true
    try {
      const response = await practiceService.getPractice(code)
      practice.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get detail practice'
    } finally {
      loading.value = false
    }
  }

  const detailPracticeSection = async (code: any) => {
    loading.value = true
    try {
      const response = await practiceService.getPracticeSection(code)
      detailSection.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get detail practice'
    } finally {
      loading.value = false
    }
  }

  const detailPracticeJournal = async (code: any, idUser: any) => {
    loading.value = true
    try {
      const response = await practiceService.getPracticeJournal(code, idUser)
      detailJournal.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get detail practice'
    } finally {
      loading.value = false
    }
  }

  const getPracticeStep = async (idUser: number) => {
    loading.value = true
    try{
      const response = await practiceService.getStepPracticeByUser(idUser)
      stepPractice.value = response
    } catch (err: any){
      error.value = err.message || 'Failed to get practice steps'
    } finally {
      loading.value = false
    }
  }

  const stepPracticeUpdate = async (templateType: string, payload: any) => {
    loading.value = true
    try{
      const response = await practiceService.updateStepPractice(templateType, payload)
      updateStepResponse.value = response
    } catch (err: any){
      error.value = err.message || 'Failed to get practice steps'
    } finally {
      loading.value = false
    }
  }

  return {
    practice,
    stepPractice,
    detailSection,
    detailJournal,
    updateStepResponse,
    loading,
    error,
    detailPractice,
    getPracticeStep,
    detailPracticeSection,
    detailPracticeJournal,
    stepPracticeUpdate
  }
})
