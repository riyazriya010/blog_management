import { useForm } from "react-hook-form";
import { axiosApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export type FormValues = {
  title: string;
  content: string;
};

export default function CreatePost() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const response = await axiosApi.createPost(data)
    console.log('create respon ', response)
    reset();
    if (response?.data.result) {
      toast.success('Post Created')
      setTimeout(() => {
        navigate('/blog')
      }, 2000)

    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        transition={Slide}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss={true}
      />
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-3xl shadow-xl transition-all">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">Create New Blog Post</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-4 py-2 border ${errors.title ? "border-red-400" : "border-gray-300"
                } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your blog post title"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              {...register("content", { required: "Content is required" })}
              rows={6}
              className={`w-full px-4 py-2 border ${errors.content ? "border-red-400" : "border-gray-300"
                } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none`}
              placeholder="Start writing your content..."
            />
            {errors.content && (
              <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition duration-300"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
