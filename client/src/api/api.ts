import type { FormValues } from "../Components/CreatePost"
import type { EditFormValues } from "../Components/EditBlog"
import axiosInstance, { axiosFileInstance } from "./axiosInstance"

export const axiosApi = {
    signup: async (data: { username: string, email: string, password: string }): Promise<any> => {
        try {
            const response = await axiosInstance.post('/users/signup',
                { username: data.username, email: data.email, password: data.password },
                { withCredentials: true }
            )
            return response
        } catch (error) {
            throw error
        }
    },

    login: async (data: { email: string, password: string }): Promise<any> => {
        try {
            const response = await axiosInstance.post('/users/login',
                { email: data.email, password: data.password },
                { withCredentials: true }
            )
            return response
        } catch (error) {
            throw error
        }
    },

    getPost: async (): Promise<any> => {
        try {
            const response = await axiosInstance.get('/blogs/get-post',
                { withCredentials: true }
            )
            return response
        } catch (error) {
            throw error
        }
    },

    createPost: async (data: FormValues): Promise<any> => {
        try {
            const response = await axiosInstance.post('/blogs/create-post',
                data,
                { withCredentials: true }
            )
            return response
        } catch (error) {
            throw error
        }
    },

    getEditPost: async (id: string): Promise<any> => {
        try {
            const response = await axiosInstance.get(`/blogs/get/edit-post?postId=${id}`,
                { withCredentials: true }
            )
            return response
        } catch (error) {
            throw error
        }
    },

    updatePost: async (id: string, data: EditFormValues): Promise<any> => {
        try {
            const response = await axiosInstance.patch(`/blogs/update-post?postId=${id}`,
                data,
                { withCredentials: true }
            )
            return response
        } catch (error) {
            throw error
        }
    },

    deletePost: async (id: string): Promise<any> => {
        try{
            const response = await axiosInstance.delete(`/blogs/delete-post?postId=${id}`,
                {withCredentials: true}
            )
            return response
        }catch(error){
            throw error
        }
    }

}

