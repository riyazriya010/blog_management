import { Request, Response } from "express";
import { sendDataResponse, sendErrorResponse } from "../utils/responseHelper";
import { HttptatusCode } from "../utils/httpStatusCodes";
import BlogServices, { blogServices } from "../services/blog.services";
import { getId } from "../integration/getId";

class BlogController {
    private blogServices: BlogServices
    constructor(blogServices: BlogServices) {
        this.blogServices = blogServices
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const userId = await getId('accessToken', req) as string
            data['authorId'] = userId
            const savePost = await this.blogServices.create(data)
            sendDataResponse(res, "Post Saved", savePost, HttptatusCode.CREATED)
            return;
        } catch (error: unknown) {
            console.log('create post error ', error)
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return;
        }
    }

    async getPost(req: Request, res: Response): Promise<void> {
        try {
            const userId = await getId('accessToken', req) as string
            const getPost = await this.blogServices.getPost(userId)
            sendDataResponse(res, "All post Got It", getPost, HttptatusCode.OK)
            return;
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return;
        }
    }

    async getEditPost(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.query
            const getPost = await this.blogServices.getEditPost(String(postId))
            sendDataResponse(res, "Post Got It", getPost, HttptatusCode.OK)
            return;
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return;
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.query
            const data = req.body
            const updatePost = await this.blogServices.updatePost(String(postId), data)
            sendDataResponse(res, "Post Updated", updatePost, HttptatusCode.OK)
            return;
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return;
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const { postId } = req.query
            const deletedPost = await this.blogServices.deletePost(String(postId))
            sendDataResponse(res, "Post Deleted", deletedPost, HttptatusCode.OK)
            return;
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return;
        }
    }

}

export const blogController = new BlogController(blogServices)