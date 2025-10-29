import type { ForumResponse } from '../types/forum'
import api from './api'

export const journalService = {

  async getAll(userId: number): Promise<ForumResponse> {
    const { data } = await api.get<ForumResponse>(`/journal/lists?user_id=${userId}`)
    return data
  },
}
