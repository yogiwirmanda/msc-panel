import type { RegisterForm } from '../types/register'
import api from './api'

export interface UserItem {
  id: number,
  name: string,
  nickname: string,
  username: string,
  phone_number: string,
  email: string,
  password: string,
  password_confirmation: string,
  address: string,
  birthdate: string,
  gender: string,
  profession: string,
  last_education: string,
  consent: {
    msc_consent: {
      value: any
    }
  }
  data: any
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

export const userService = {
  async getUsers(page = 1, limit = 10, is_pagination = true): Promise<PaginatedResponse<UserItem>> {
    const { data } = await api.get<PaginatedResponse<UserItem>>('/user', {
      params: { is_pagination, page, limit },
    })
    return data
  },

  async getUserById(id: number): Promise<UserItem> {
    const { data } = await api.get<UserItem>(`/user/detail?id=${id}`)
    return data
  },

  async createUser(payload: Partial<UserItem>): Promise<UserItem> {
    const { data } = await api.post<UserItem>('/user/create', payload)
    return data
  },

  async updateUser(userId: any, payload: Partial<RegisterForm>): Promise<UserItem> {
    const { data } = await api.patch<UserItem>(`/user/update?id=${userId}`, payload)
    return data
  },

  async deleteUser(user: Partial<UserItem>): Promise<UserItem> {
    const { data } = await api.delete<UserItem>('/user/delete', {
      data: user,
    })
    return data
  },
}
