import api from './api'

export interface PracticeInterface {
  practice: {
    id: 1,
    code: string,
    title: string,
    short_summary: string,
    description_md: string,
    cover_image_url: string,
    is_active: number,
    sort_order: number,
  }
}

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
}
