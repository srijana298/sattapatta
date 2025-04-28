import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserSchema, LoginUser } from '../lib/users';
import { useMutation } from 'react-query';
import { loginUser, verify } from '../services/users';
import { useAuth } from '../components/AuthContext';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginUserSchema)
  });
  const { mutateAsync } = useMutation({
    mutationFn: (value: LoginUser) => loginUser(value),
    mutationKey: ['loginUser'],
    onSuccess: async ({ access_token }) => {
      localStorage.setItem('access_token', access_token);
      const user = await verify();
      setCurrentUser(user);
      toast.success('User logged in successfully');
      navigate('/home');
    }
  });

  return (
    <>
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Log In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you new here ?
              <Link className="font-medium text-orange-600 hover:text-orange-500" to="/signup">
                Register
              </Link>
            </p>
          </div>

          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" method="POST" onSubmit={handleSubmit(mutateAsync)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 block w-full pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="you@example.com"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="pl-10 block w-full pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <i className="fas fa-user-plus text-orange-300 group-hover:text-orange-200"></i>
                  </span>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
