import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosApi } from "../api/api";

export type EditFormValues = {
  title: string;
  content: string;
};

export default function EditPost() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFormValues>();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const postId = searchParams.get("postId");

  useEffect(() => {
    const fetchData = async () => {
      if (!postId) return;

      try {
        const response = await axiosApi.getEditPost(postId);
        const post = response?.data?.result;

        if (post) {
          reset({
            title: post.title,
            content: post.content,
          });
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    fetchData();
  }, [postId, reset]);

  const onSubmit = async (data: EditFormValues) => {
    try {
      const response = await axiosApi.updatePost(String(postId), data);
      console.log('updat: ',response)
      if (response?.data?.result) {
        navigate("/blog");
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-3xl shadow-xl transition-all">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
          Edit Blog Post
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-4 py-2 border ${
                errors.title ? "border-red-400" : "border-gray-300"
              } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Edit blog post title"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              {...register("content", { required: "Content is required" })}
              rows={6}
              className={`w-full px-4 py-2 border ${
                errors.content ? "border-red-400" : "border-gray-300"
              } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none`}
              placeholder="Edit content here..."
            />
            {errors.content && (
              <p className="text-sm text-red-500 mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
