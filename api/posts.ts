import RequestHandler, { NetworkError } from "../util/RequestHandler"

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
    pools: number[]
    sources: string[] | null
    relationships: {
      parent_id: number | null
      has_children: boolean
      has_active_children: boolean
      children: number[]
    }
}

export default class Posts {
    requestHandler: RequestHandler = new RequestHandler(null, null, false, 20, 'e926.net')

    constructor(handler: RequestHandler | undefined, ...options: [string, string, boolean, number, string]) {
        if (handler) {
            this.requestHandler = handler
            return
        }
        this.requestHandler = new RequestHandler(...options)
    }

    async searchByTags<T = unknown>(tags: string[], limit: number) {
        const searchQuery = encodeURIComponent(tags.join(' ')).replace(/%20/g, '+')
        return new Promise<T | null>((resolve, reject) => {
          const timeOut = setTimeout(() => {
            reject(new NetworkError('Request timed out', 'Request timed out'))
          }
        })
    }
}