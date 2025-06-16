import express from 'express'
import { blogController } from '../controller/blog.controller'
import authenticateToken from '../middleware/verifyToken'

const router = express.Router()

router
.post('/create-post',authenticateToken, blogController.create.bind(blogController))
.get('/get-post',authenticateToken, blogController.getPost.bind(blogController))
.get('/get/edit-post',authenticateToken, blogController.getEditPost.bind(blogController))
.patch('/update-post',authenticateToken, blogController.updatePost.bind(blogController))
.delete('/delete-post',authenticateToken, blogController.deletePost.bind(blogController))


export const blogRouter = router
