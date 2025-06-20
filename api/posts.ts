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

interface DanBooruPost {
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
  approver_id: number | null
  last_noted_at: string | null
  last_comment_bumped_at: string | null
  fav_count: number
  tag_string: string
  tag_count: number
  tag_count_general: number
  tag_count_artist: number
  tag_count_character: number
  tag_count_copyright: number
  file_ext: string
  file_size: number
  file_width: number
  file_height: number
  parent_id: number | null
  has_children: boolean
  is_banned: boolean
  pixiv_id: number | null
  last_commented_at: string | null
  has_active_children: boolean
  bit_flags: number
  has_large: boolean
  has_visible_children: boolean
  tag_string_general: string
  tag_string_artist: string
  tag_string_character: string
  tag_string_copyright: string
  tag_string_meta: string
  file_url: string
  large_file_url: string
  preview_file_url: string
}

const danBooruPostToPost = (post: DanBooruPost): Post => {
  const e6post: Post = undefined as unknown as Post
  e6post.id = post.id
  e6post.created_at = post.created_at
  e6post.approved_at = null
  e6post.file = {
    width: post.file_width,
    height: post.file_height,
    ext: post.file_ext,
    size: post.file_size,
    md5: post.md5,
    url: post.file_url
  }
  e6post.preview = {
    width: post.file_width,
    height: post.file_height,
    url: post.preview_file_url
  }
  e6post.sample = {
    has: false,
    height: post.file_height,
    width: post.file_width,
    url: post.large_file_url,
    alternates: null
  }
  e6post.score = {
    up: post.up_score,
    down: post.down_score,
    total: post.score
  }
  e6post.tags = {
    general: post.tag_string_general.split(' '),
    species: [],
    character: post.tag_string_character.split(' '),
    artist: post.tag_string_artist.split(' '),
    copyright: post.tag_string_copyright.split(' '),
    invalid: [],
    lore: [],
    meta: post.tag_string_meta.split(' ')
  }
  e6post.locked_tags = []
  e6post.change_seq = 0
  e6post.flags = {
    pending: post.is_pending,
    flagged: post.is_flagged,
    note_locked: false,
    status_locked: false,
    rating_locked: false,
    deleted: post.is_deleted
  }
  e6post.rating = post.rating
  return e6post
}
