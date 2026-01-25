import React from 'react';
import SocialLogin from './SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import ProLogo from '../components/ProLogo';
import { useForm } from 'react-hook-form';
import UseAuth from '../Hooks/UseAuth';

const Login = () => {
  const { register, handleSubmit,formState:{errors} } = useForm();
  const {signIn} = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = data => {
    signIn(data.email,data.password)
    .then(result => {
      console.log(result.user);
      navigate(from);
    })
    .catch(error => console.log(error))
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <ProLogo />
        <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              {...register('email')}
              id="email"
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-black placeholder-gray-400
"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium" htmlFor="password">
                Password
              </label>



              <Link
                to=""
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <input
            {...register('password',{required:true,minLength:6})}
              id="password"
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-black placeholder-gray-400"
              type="password"
              placeholder="Enter your password"
              required
            />
            {
              errors.password?.type === 'required && <p> password is required <p/>'
            }
            {
              errors.password?.type === 'minLength' && <p>password must be 6 character</p>
            }
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <SocialLogin />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/auth/register"
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          By signing in, you agree to our{' '}
          <a href="#" className="text-emerald-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-emerald-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;