import type { CommentPayload, ForumResponse, ReplyPayload } from '../types/forum'
import api from './api'

export const forumService = {

  async getAll(practiceId: number, limit: number, cursorId: number): Promise<ForumResponse> {
    const { data } = await api.get<ForumResponse>(`/practices/${practiceId}/forum?limit=${limit}&cursor_id=${cursorId}`)
    return data
  },

  async postComment(practiceId: number, payload: any): Promise<CommentPayload> {
    const { data } = await api.post<CommentPayload>(`/practices/${practiceId}/forum/comments`, payload)
    return data
  },

  async postReply(practiceId: number, payload: any): Promise<ReplyPayload> {
    const { data } = await api.post<ReplyPayload>(`/practices/${practiceId}/forum/replies`, payload)
    return data
  },
}
