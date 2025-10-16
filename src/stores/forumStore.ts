import { defineStore } from 'pinia'
import { ref } from 'vue'
import { forumService } from '../services/forumService'

export const useForumStore = defineStore('forum', () => {
  const submitComment = ref<any>()
  const submitReply = ref<any>()
  const forumResponse = ref<any>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getAllForum = async (practiceId: number,limit:number, cursorId:number) => {
    loading.value = true
    try {
      const response = await forumService.getAll(practiceId, limit, cursorId)
      forumResponse.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get all forum'
    } finally {
      loading.value = false
    }
  }

  const comment = async (practiceId: number, payload: any) => {
    loading.value = true
    try {
      const response = await forumService.postComment(practiceId, payload)
      submitComment.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get all forum'
    } finally {
      loading.value = false
    }
  }

  const reply = async (practiceId: number, payload: any) => {
    loading.value = true
    try {
      const response = await forumService.postReply(practiceId, payload)
      submitReply.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to get all forum'
    } finally {
      loading.value = false
    }
  }

  return {
    submitComment,
    submitReply,
    forumResponse,
    loading,
    error,
    getAllForum,
    comment,
    reply
  }
})
