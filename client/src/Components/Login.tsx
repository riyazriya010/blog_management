import { AxiosError } from 'axios';
import { axiosApi } from '../api/api';
import { useAppDispatch } from '../hooks/hook';
import { updateUser } from '../redux/slice';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginUser {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUser>();

  const onSubmit = async (data: LoginUser) => {
    try {
      const response = await axiosApi.login(data);
      if (response?.data.result) {
        const data = response.data.result;
        dispatch(
          updateUser({
            _id: data._id,
            username: data.username,
            email: data.email,
          })
        );
        reset();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error && error.response?.status === 401) {
          toast.error(error.response?.data?.message)
        }
        if (error && error.response?.status === 403) {
          toast.warn(error.response?.data?.message)
        }
      }
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white px-4">
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        transition={Slide}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss={true}
      />
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">Welcome Back 👋</h1>
          <p className="mt-1 text-sm text-gray-500">Login to your blog account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`mt-1 w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-400' : 'border-gray-300'
                }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className={`mt-1 w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-400' : 'border-gray-300'
                }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            Sign In
          </button>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative text-center text-sm text-gray-500 bg-white px-2">
            Don't have an account?
          </div>
        </div>

        <a
          href="/signup"
          className="w-full block text-center mt-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 py-2 rounded-md text-sm transition"
        >
          Create your account
        </a>
      </div>
    </div>
  );
}
