/* This is a file for temporary interfaces */
export interface Post {
  id: number
  created_at: string
  approved_at: string |null
  fav_count: number
  uploader_id: number
  approver_id: number | null
  rating: string
  description: string
  comment_count: number
  is_favourited: boolean
  has_notes: boolean
  duration: number | null
  score: {
    up: number
    down: number
    total: number
  }
  file: {
    width: number
    height: number
    url: string
  }
  preview: {
    width: number
    height: number
    url: string
  }
  sample: {
    has: boolean
    height: number
    width: number
    url: string
  }
  tags: {
    artist: string[]
    copyright: string[]
    character: string[]
    species: string[]
    general: string[]
    lore: string[]
    meta: string[]
    invalid: string[]
  }
  pools: number[]
  sources: string[] | null

}
