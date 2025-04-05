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

export interface PostSortingOptions {
  id?: boolean
  score?: 'asc' | 'desc'
  fav_count?: 'asc' | 'desc'
  tag_count?: 'asc' | 'desc'
  comment_count?: 'asc' | 'desc'
  comment_bumped?: 'asc' | 'desc'
  mpixels?: 'asc' | 'desc'
  filesize?: 'asc' | 'desc'
  landscape?: boolean
  portrait?: boolean
  change?: boolean
  duration?: 'asc' | 'desc'
  random?: boolean
}

export interface MetaTags {
  user?: {
    name?: string
    id?: number
    fav?: number
    voted?: string
    votedup?: string
    voteddown?: string
    approver?: string
    deletedby?: string
    commenter?: string
    noteupdater?: string
  }
  post?: {
    count?: {
      id?: number
      score?: number
      favcount?: number
      comment_count?: number
      tagcount?: number
      gentags?: number
      arttags?: number
      chartags?: number
      copytags?: number
      spectags?: number
      invtags?: number
      lortags?: number
      metatags?: number
    }
    rating?: {
      safe?: boolean
      questionable?: boolean
      explicit?: boolean
    }
    filetype?: {
      jpg?: boolean
      png?: boolean
      gif?: boolean
      webm?: boolean
      swf?: boolean
    }
    imagesize?: {
      width?: number
      height?: number
      mpixels?: number
      ratio?: number
      filesize?: `${number}${'MB' | 'KB'}`
    }
    status?: {
      pending?: boolean
      active?: boolean
      deleted?: boolean
      flagged?: boolean
      modqueue?: boolean
      any?: boolean
    }
  }
}

interface DeprecatedPost {
  id: number
  created_at: string
  updated_at: string
  up_score: number
  down_score: number
  score: number
  source: string
  md5: string
  rating: 'e' | 'q' | 's'
  is_pending: boolean
  is_flagged: boolean
  is_deleted: boolean
  uploader_id: number
  approver: 
}
