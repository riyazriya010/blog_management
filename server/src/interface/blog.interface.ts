import { IBlog } from "../model/blog.model"
import { CreatePost, UpdatePost } from "./blog.types"


export interface BlogMethods {
    create(data: CreatePost): Promise<IBlog | null>
    getPost(userId: string): Promise<IBlog[] |[]>
    getEditPost(postId: string): Promise<IBlog | null>
    updatePost(postId: string, data: UpdatePost): Promise<IBlog | null>
    deletePost(postId: string): Promise<IBlog | null>
}

