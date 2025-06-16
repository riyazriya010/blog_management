import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hook";
import { axiosApi } from "../api/api";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosApi.getPost();
      if (response?.data.result) {
        setPosts(response.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.warn('User logged out');
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-post?postId=${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        const response = await axiosApi.deletePost(id);

        if (response?.data.success) {
          toast.success('Post Deleted');
          fetchData();
          await Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        } else {
          toast.error('Failed to delete the post');
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Something went wrong');
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        transition={Slide}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss={true}
      />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-10 bg-white shadow px-4 py-3 flex justify-between items-center sm:px-6">
        <span className="text-lg font-semibold text-gray-800">👤 {user.username}</span>
        <div className="flex gap-3">
          <a
            href="/create-post"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            ➕ Create Post
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Blog Feed */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No blog posts available.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{post.content}</p>
              <p className="text-xs text-gray-500 text-right">
                {new Date(post.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }).replace(/ /g, '-')} —{" "}
                {new Date(post.createdAt).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
