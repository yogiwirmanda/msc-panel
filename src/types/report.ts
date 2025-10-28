export type ReportTest = {
  data: {
    testType: string,
    member: {
      id: number,
      name: string,
      nickname: string,
      phone_number: string,
      email: string,
      birthdate: string,
      gender: string,
      profession: string,
      last_education: string,
      address: string,
      age: number
    },
    reportTables: [
      {
        category: string,
        total_questions: number,
        total_score: number,
        score_level: string
      }
    ]
  },
  success: boolean,
  message: string
}