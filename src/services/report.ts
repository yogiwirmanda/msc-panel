import type { ReportTest } from '../types/report'
import api from './api'

export const reportService = {
  async getReport(type: string, userId:number): Promise<ReportTest> {
    const { data } = await api.get<ReportTest>(`/report/test?user_id=${userId}&test_type=${type}`)
    return data
  },
}
