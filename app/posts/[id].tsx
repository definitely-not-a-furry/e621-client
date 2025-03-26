import React from "react"
import { useRouter, useLocalSearchParams } from "expo-router"

const Post = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()
    return <div>Post {id}</div>
}