import type { QuestAttemptPayload, QuestQuestion, QuestSubmitAnswer, QuestTemplate } from '../types/quest'
import api from './api'

export const questService = {

  async getTemplate(type: string, by: string, value:number): Promise<QuestTemplate> {
    const { data } = await api.get<QuestTemplate>(`/quest/template/find?type=${type}&by=${by}&value=${value}`)
    return data
  },

  async getQuestion(type: string, by: string, value:number): Promise<QuestQuestion> {
    const { data } = await api.get<QuestQuestion>(`/quest/template/questions?type=${type}&by=${by}&value=${value}`)
    return data
  },

  async attemptQuest(payload: any): Promise<QuestAttemptPayload> {
    const { data } = await api.post<QuestAttemptPayload>(`/quest/quest-attempt/create`, payload)
    return data
  },

  async attemptFind(userId: number, questionnaireId:number): Promise<QuestQuestion> {
    const { data } = await api.get<QuestQuestion>(`/quest/quest-attempt/find?user_id=${userId}&questionnaire_id=${questionnaireId}`)
    return data
  },

  async submitQuest(payload: any): Promise<QuestSubmitAnswer> {
    const { data } = await api.post<QuestSubmitAnswer>(`/quest/quest-answer/submit`, payload)
    return data
  },
}
