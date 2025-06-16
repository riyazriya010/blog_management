import { BlogMethods } from "../interface/blog.interface";
import { CreatePost } from "../interface/blog.types";
import { LoginUpData, SignUpData } from "../interface/user.types";
import { IBlog, BlogModel } from "../model/blog.model";
import CommonBaseRepository from "./base/base.repository";

export default class BlogRepository extends CommonBaseRepository<{
    Blog: IBlog
}> implements BlogMethods {
    constructor() {
        super({
            Blog: BlogModel
        })
    }

    async create(data: CreatePost): Promise<IBlog | null> {
        return this.createData('Blog', data)
    }

    async getPost(userId: string): Promise<IBlog[] | []> {
        return this.findAll('Blog', { authorId: userId })
    }

    async getEditPost(postId: string): Promise<IBlog | null> {
        return this.findById('Blog', postId)
    }

    async updatePost(postId: string, data: CreatePost): Promise<IBlog | null> {
        return this.updateById('Blog', postId, data)
    }

    async deletePost(postId: string): Promise<IBlog | null> {
        return this.deleteById('Blog',postId)
    }


}

