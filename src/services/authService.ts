import api from './api'

export interface RegisterForm {
  name: string;
  nickname: string;
  username: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  address: string;
  birthdate: any;
  gender: string;
  profession: string;
  last_education: string;
  consent: string;
}

export interface PaginatedResponse<T> {
  data: {
    items: T[]
    total: number
    is_pagination: true
    page: number
    limit: number
    totalPages: number
  }
}

export const authService = {

  async createMember(payload: Partial<RegisterForm>): Promise<RegisterForm> {
    const { data } = await api.post<RegisterForm>('/auth/register', payload)
    return data
  },

  async loginMember(payload: Partial<RegisterForm>): Promise<RegisterForm> {
    const { data } = await api.post<RegisterForm>('/auth/login', payload)
    return data
  },

  async initialize(): Promise<RegisterForm> {
    const { data } = await api.get<RegisterForm>('/auth/initialize')
    return data
  },
}
