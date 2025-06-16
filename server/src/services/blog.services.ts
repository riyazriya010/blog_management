import { BlogMethods } from "../interface/blog.interface";
import { CreatePost, UpdatePost } from "../interface/blog.types";
import { IBlog } from "../model/blog.model";
import BlogRepository from "../repository/blog.repository";
import mongoose from "mongoose";

export default class BlogServices implements BlogMethods {
    private blogRepository: BlogRepository
    constructor(blogRepository: BlogRepository) {
        this.blogRepository = blogRepository
    }

    async create(data: CreatePost): Promise<IBlog | null> {
        try{
            const authorId = new mongoose.Types.ObjectId(data.authorId)
            const savePost = await this.blogRepository.create({...data, authorId})
            return savePost
        }catch(error){
            throw error
        }
    }

    async getPost(userId: string): Promise<IBlog[] | []> {
        try{
            const getPost = await this.blogRepository.getPost(userId)
            return getPost
        }catch(error){
            throw error
        }
    }

    async getEditPost(postId: string): Promise<IBlog | null> {
        try{
            const getEditPost = await this.blogRepository.getEditPost(postId)
            return getEditPost
        }catch(error){
            throw error
        }
    }

    async updatePost(postId: string, data: UpdatePost): Promise<IBlog | null> {
        try{
            const updatePost = await this.blogRepository.updatePost(postId, data)
            return updatePost
        }catch(error){
            throw error
        }
    }

    async deletePost(postId: string): Promise<IBlog | null> {
        try{
            const deletedPost = await this.blogRepository.deletePost(postId)
            return deletedPost
        }catch(error){
            throw error
        }
    }

}

const blogRepository = new BlogRepository();
export const blogServices = new BlogServices(blogRepository);
