export type QuestQuestion = {
  data: {
    questions: {
      id: number,
      code: string,
      title: string,
      description_md: string,
      questionnaire_type: string,
      scope: string,
      is_active: number,
      questions: any
    }
  }
}

export type QuestionItem = {
  questions: [
    {
      id: number,
      questionnaire_id: number,
      prompt: string,
      question_type: string,
      required: number,
      sort_order: number,
      scale_min: number,
      scale_max: number,
      options: [
        {
          id: number,
          question_id: number,
          label: string,
          value: number,
          sort_order: number
        }
      ]
    }
  ]
}

export type QuestTemplate = {
  data: {
    questTemplate: {
      id: number,
      created_at: string,
      updated_at: string,
      code: string,
      title: string,
      description_md: string,
      questionnaire_type: string,
      scope: string,
      is_active: number
    }
  },
  success: any,
  message: string
}

export type QuestAttemptPayload = {
  user_id: number,
  questionnaire_id: string,
  status: string
}

export type QuestAttempCreate = {
  id: number,
  created_at: string,
  updated_at: string,
  questionnaire_id: number,
  user_id: number,
  practice_id: any,
  status: string,
  score: any,
  started_at: string,
  submitted_at: any
}

export type QuestSubmitAnswer = {
  userId: number,
  attemptId: number,
  submit: any,
  answers: [
    {
      questionId: number,
      type: string,
      optionId: number
      text: string
    },
  ]
}