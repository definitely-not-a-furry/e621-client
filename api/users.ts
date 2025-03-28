export interface User {
    id: number
    created_at: string
    name: string
    level: number
    base_upload_limit: number
    post_upload_count: number
    note_update_count: number
    favorite_count: number
    comment_count: number
    is_banned: boolean
    can_approve_posts: boolean
    can_upload_free: boolean
    level_string: string
    avatar_id: number | null
}


