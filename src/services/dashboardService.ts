import type { ForumResponse } from '../types/forum'
import api from './api'

export const dashboardService = {

  async getAll(userId: number): Promise<ForumResponse> {
    const { data } = await api.get<ForumResponse>(`/dashboard?userId=${userId}`)
    return data
  },
}
