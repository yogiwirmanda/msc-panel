import type { ReportTest } from '../types/report'
import api from './api'
import type { PaginatedResponse } from './authService'
import type { UserItem } from './userService'

export const reportService = {
  async getReport(type: string, userId:number): Promise<ReportTest> {
    const { data } = await api.get<ReportTest>(`/report/test?user_id=${userId}&test_type=${type}`)
    return data
  },
  async excel(type: string, userId:number): Promise<ReportTest> {
    const { data } = await api.get<ReportTest>(`/report/test/exportExcel?user_id=${userId}&test_type=${type}`)
    return data
  },
  async excelAll(): Promise<ReportTest> {
    const { data } = await api.get<ReportTest>(`/report/generate/excel`)
    return data
  },
  async getMembers(page = 1, limit = 10, is_pagination = true): Promise<PaginatedResponse<UserItem>> {
    const { data } = await api.get<PaginatedResponse<UserItem>>('/member/report', {
      params: { is_pagination, page, limit },
    })
    return data
  },
}
