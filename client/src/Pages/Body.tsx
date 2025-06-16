import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./LoginPage"
import ProtectedRoutes from "./ProtectedRoutes"
import SignUpPage from "./SignUpPage"
import CreatePostPage from "./CreatePostPage"
import BlogPage from "./BlogPage"
import EditBlogPage from "./EditBlogPage"

export default function Body() {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <LoginPage />
        },
        {
            path: '/signup',
            element: <SignUpPage />
        },
        {
            path: '/create-post',
            element: (
                <ProtectedRoutes>
                    <CreatePostPage />
                </ProtectedRoutes>
            )
        },
        {
            path: '/blog',
            element: (
                <ProtectedRoutes>
                    <BlogPage />
                </ProtectedRoutes>
            )
        },
        {
            path: '/edit-post',
            element: (
                <ProtectedRoutes>
                    <EditBlogPage />
                </ProtectedRoutes>
            )
        },
    ])

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

