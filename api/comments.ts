export interface Comment {
    id: number
    created_at: string
    post_id: number
    creator_id: number
    body: string
    score: number
    updated_at: string
    updater_id: number
    do_not_bump_post: boolean // Deprecated
    is_hidden: boolean
    is_stickey: boolean
    warning_type: null | "warning" | "record" | "ban"
    warning_user_id: null | number
    creator_name: string
    updater_name: string
}
