export interface Tag {
  id: number
  name: string
  post_count: number
  related_tags: string | '[]'
  related_tags_updated_at: string | null
  category: 0 | 1 | 3 | 4 | 5 | 6 | 7 | 8
  is_locked: boolean
  created_at: string
  updated_at: string
}