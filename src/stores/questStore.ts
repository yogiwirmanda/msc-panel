import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { QuestQuestion, QuestTemplate } from '../types/quest'
import { questService } from '../services/quest'

export const useQuestStore = defineStore('quest', () => {
  const submitResponse = ref<any>()
  const attemptResponse = ref<any>()
  const questTemplate = ref<QuestTemplate>()
  const question = ref<QuestQuestion>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const detailTemplate = async (type: string,by:string, value:number) => {
    loading.value = true
    try {
      const response = await questService.getTemplate(type, by, value)
      questTemplate.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get detail ques template'
    } finally {
      loading.value = false
    }
  }

  const detailQuestion = async (type: string, by: string, value: number) => {
    try {
      const response = await questService.getQuestion(type, by, value)
      question.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get detail question'
    } finally {
      loading.value = false
    }
  }

  const doAttemptQuest = async (payload:any) => {
    try {
      const response = await questService.attemptQuest(payload)
      attemptResponse.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to submit attempt quest'
    } finally {
      loading.value = false
    }
  }

  const findAttemptQuest = async (userId: number, questionnaireId: number) => {
    try {
      const response = await questService.attemptFind(userId, questionnaireId)
      attemptResponse.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to submit attempt quest'
    } finally {
      loading.value = false
    }
  }

  const doSubmitQuest = async (payload:any) => {
    try {
      const response = await questService.submitQuest(payload)
      submitResponse.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to submit attempt quest'
    } finally {
      loading.value = false
    }
  }

  return {
    questTemplate,
    attemptResponse,
    submitResponse,
    question,
    loading,
    error,
    detailQuestion,
    detailTemplate,
    doAttemptQuest,
    findAttemptQuest,
    doSubmitQuest
  }
})
