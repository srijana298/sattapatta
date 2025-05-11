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

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

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
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (value: LoginUser) => loginUser(value),
    mutationKey: ['loginUser'],
    onSuccess: async ({ access_token }) => {
      localStorage.setItem('access_token', access_token);
      const user = await verify();
      setCurrentUser(user);
      toast.success('User logged in successfully');
      navigate('/');
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (values: LoginUser) => {
    await mutateAsync(values);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Log in</h1>
            <div className="mt-4 flex justify-center space-x-2 text-lg">
              Doesn't have an account ?{' '}
              <Link
                className="text-orange-600 hover:text-orange-500 cursor-pointer pl-3"
                to="/signup"
              >
                Sign up
              </Link>
            </div>
          </div>

          <form className="bg-white p-8 shadow rounded-lg" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                    placeholder="Your email"
                    {...register('email')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="pl-10 pr-10 block w-full border border-gray-300 rounded-md py-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                    placeholder="Your password"
                    {...register('password')}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
                  Log in
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-600">
              <p>By clicking Log in, you agree to Preply</p>
              <div className="space-x-1">
                <a className="text-orange-600 hover:text-orange-500 cursor-pointer">Terms of Use</a>
                <span>and</span>
                <a className="text-orange-600 hover:text-orange-500 cursor-pointer">
                  Privacy Policy
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
