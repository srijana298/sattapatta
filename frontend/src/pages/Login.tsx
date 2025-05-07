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

// const Login = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="flex-grow flex items-center justify-center px-4 py-12">
//         <div className="max-w-md w-full space-y-8">
//           <div className="text-center">
//             <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Log In</h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Are you new here ?
//               <Link className="font-medium text-orange-600 hover:text-orange-500" to="/signup">
//                 Register
//               </Link>
//             </p>
//           </div>

//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             <form className="space-y-6" method="POST" onSubmit={handleSubmit(mutateAsync)}>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                   </div>
//                   <input
//                     id="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="pl-10 block w-full pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition"
//                     placeholder="you@example.com"
//                     {...register('email')}
//                   />
//                   {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                   </div>
//                   <input
//                     id="password"
//                     type="password"
//                     autoComplete="new-password"
//                     required
//                     className="pl-10 block w-full pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition"
//                     placeholder="••••••••"
//                     {...register('password')}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
//                 >
//                   <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                     <i className="fas fa-user-plus text-orange-300 group-hover:text-orange-200"></i>
//                   </span>
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
      console.log({ access_token });
      localStorage.setItem('access_token', access_token);
      const user = await verify();
      setCurrentUser(user);
      toast.success('User logged in successfully');
      navigate('/home');
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (values: LoginUser) => {
    await mutateAsync(values);
  };

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
