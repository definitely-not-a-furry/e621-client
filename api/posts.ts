export interface Post {
  id: number
  created_at: string
  approved_at: string | null
  file: {
    width: number
    height: number
    ext: string
    size: number
    md5: string
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
    alternates: Record<string, {
      type: string
      height: number
      width: number
      urls: Array<string | null>
    }> | null
  }
  score: Record<'up' | 'down' | 'total', number>
  tags: Record<'general' | 'species' | 'character' | 'copyright' | 'artist' | 'invalid' | 'lore' | 'meta', string[]>
  locked_tags: string[]
  change_seq: number
  flags: Record<'pending' | 'flagged' | 'note_locked' | 'status_locked' | 'rating_locked' | 'deleted', boolean>
  rating: string
  fav_count: number
  sources: string[] | null
  pools: number[]
  relationships: {
    parent_id: number | null
    has_children: boolean
    has_active_children: boolean
    children: number[]
  }
  approver_id: number | null
  uploader_id: number
  description: string
  comment_count: number
  is_favourited: boolean
  has_notes: boolean
  duration: number | null
}

export interface Posts {
  posts: Post[]
}

export interface SinglePost {
  post: Post
}
