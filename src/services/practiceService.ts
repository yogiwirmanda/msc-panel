import type { PracticeDetailSection, PracticeInterface, PracticeJournal, PracticeSteps } from '../types/practice'
import api from './api'

export interface PaginatedResponse<T> {
  data: {
    practice: T[]
  }
}

export const practiceService = {

  async getPractice(code: any): Promise<PracticeInterface> {
    const { data } = await api.get<PracticeInterface>('/practice/detail/' + code)
    return data
  },

  async getPracticeSection(code: any): Promise<PracticeDetailSection> {
    const { data } = await api.get<PracticeDetailSection>('/practice/detail/' + code + '/sections?displayBy=all')
    return data
  },

  async getPracticeJournal(code: any, idUser: any): Promise<PracticeJournal> {
    const { data } = await api.get<PracticeJournal>(`/practice/${code}/journal?user_id=${idUser}`)
    return data
  },

  async getStepPracticeByUser(idUser: number): Promise<PracticeSteps> {
    const {data} = await api.get<PracticeSteps>(`/practice/practice-steps?user_id=${idUser}`)
    return data
  },

  async updateStepPractice(templateType: string, payload: any): Promise<PracticeSteps> {
    const {data} = await api.patch<PracticeSteps>(`/practice/update-step?template_type=${templateType}`, payload)
    return data
  }
}
