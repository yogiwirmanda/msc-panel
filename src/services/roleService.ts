import api from './api'

export interface RoleItem {
  id: number
  role: string
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

export const roleService = {
  async getRoles(page = 1, limit = 10, is_pagination = true): Promise<PaginatedResponse<RoleItem>> {
    const { data } = await api.get<PaginatedResponse<RoleItem>>('/role', {
      params: { is_pagination, page, limit },
    })
    return data
  },

  async getRoleById(id: number): Promise<RoleItem> {
    const { data } = await api.get<RoleItem>(`/role/detail/${id}`)
    return data
  },

  async createRole(role: Partial<RoleItem>): Promise<RoleItem> {
    const { data } = await api.post<RoleItem>('/role/create', role)
    return data
  },

  async updateRole(role: Partial<RoleItem>): Promise<RoleItem> {
    const { data } = await api.patch<RoleItem>('/role/update', role)
    return data
  },

  async deleteRole(role: Partial<RoleItem>): Promise<RoleItem> {
    const { data } = await api.delete<RoleItem>('/role/delete', {
      data: role,
    })
    return data
  },
}
