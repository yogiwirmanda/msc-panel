export type PracticeForm = {
  code: string;
  title: string;
  short_summary: string;
  description: string;
  cover_image_url: string;
  is_active: number;
  sort_order: number;
}

export type PracticeSteps = {
  data: {
    user: {
      id: number,
      username: string,
      email: string
    },
    practice_steps: [
      {
        sort_order: number,
        code: string,
        step_type: string,
        ref_id: number,
        title: string,
        description_md: string,
        status: string,
        started_at: any,
        completed_at: any
      }
    ]
  },
  success: boolean,
  message: string
}

export type PracticeItemStep = {
  sort_order: number,
  code: string,
  step_type: string,
  ref_id: number,
  title: string,
  description_md: string,
  status: string,
  started_at: any,
  completed_at: any
}

export type PracticeDetailSection = {
  data: {
    practice: {
      id: number,
      code: string,
      title: string,
      short_summary: string,
      cover_image_url: string,
      description: string,
      sections: any
    },
  }
  success: any,
  message: string
}

export type PracticeItemDetailSection = {
  id: number,
  code: string,
  title: string,
  short_summary: string,
  cover_image_url: string,
  description: string,
  sections: [
    {
      id: number,
      section_code: string,
      title: string,
      content_html: string,
      media_url: string,
      sort_order: number
    }
  ]
}

export type PracticeJournal = {
  success: any,
  data: {
    meta: {
      title: string,
      description_md: string,
      practice_template_id: number,
      practice_code: string,
      section_id: number,
      questionnaire_id: number,
      questionnaire_code: string
    },
    attempt: {
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
    },
    questions: [
      {
        id: number,
        created_at: string,
        updated_at: string,
        questionnaire_id: 3,
        prompt: string,
        question_type: string,
        required: number,
        sort_order: number,
        scale_min: any,
        scale_max: any
      }
    ]
  },
  message: string
}

export type PracticeJournalItem = {
  id: number,
  created_at: string,
  updated_at: string,
  questionnaire_id: 3,
  prompt: string,
  question_type: string,
  required: number,
  sort_order: number,
  scale_min: any,
  scale_max: any
}

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
  },
  data: any,
}

export interface PracticeItem {
    id: 1,
    code: string,
    title: string,
    short_summary: string,
    description_md: string,
    cover_image_url: string,
    is_active: number,
    sort_order: number,
}