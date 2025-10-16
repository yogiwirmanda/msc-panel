export type CommentPayload = {
  user_id: number,
  body: string
}

export type ReplyPayload = {
  user_id: number,
  parent_id: number,
  body: string
}

export type ForumResponse = {
  thread: {
    id: number,
    practice_id: number,
    title: string,
    description: string
  },
  items: [
    {
      comment: {
        id: number,
        created_at: string,
        thread_id: number,
        parent_id: any,
        user_id: number,
        body: string,
        depth: number,
        is_deleted: number
      },
      replies: [
        {
          id: number,
          created_at: string,
          thread_id: number,
          parent_id: number,
          user_id: number,
          body: string,
          depth: number,
          is_deleted: number
        }
      ],
      reply_count: number
    },
  ],
  next_cursor_id: number
}