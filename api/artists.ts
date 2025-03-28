export interface Artist {
    id: number
    name: string
    updated_at: string
    is_active: boolean
    other_names: string | string[]

    group_name: string
    linked_user_id: number | null
    url: string
    created_at: string
    creator_id: number
    is_locked: boolean
    notes: string | null
}