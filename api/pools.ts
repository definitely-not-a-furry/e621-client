export interface Pool {
  id: number
  name: string
  created_at: string
  updated_at: string
  creator_id: number
  description: string
  is_active: boolean
  category: 'series' | 'collection'
  post_ids: number[]
  creator_name: string
  post_count: number
}
