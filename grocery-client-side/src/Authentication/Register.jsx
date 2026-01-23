import React from 'react';
import SocialLogin from './SocialLogin';
import ProLogo from '../components/ProLogo';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import UseAuth from '../Hooks/UseAuth';

import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase.config";
import UseAxios from '../Hooks/UseAxios';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const axiosInstance = UseAxios();


  // ✅ Step 1: useForm + watch
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const selectedRole = watch("role") || "user"; // ✅ Ekhane role track hocche


  const { createUser } = UseAuth();

  const onSubmit = data => {
    createUser(data.email, data.password)
      .then(async (result) => {
        const role = data.role || "user";

        // MongoDB
        await axiosInstance.post('/users', {
          email: data.email,
          role,
          firstName: data.firstName,   // ✅ SAVE NAME
          lastName: data.lastName,
          created_at: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });

        const user = result.user;

        // Firestore (safe merge)
        await setDoc(
          doc(db, "users", user.uid),
          {
            email: user.email,
            role,
            createdAt: new Date(),
          },
          { merge: true }
        );

        // navigate(role === "seller" ? "/seller" : from);
        navigate(from);
      })
      .catch(error => console.log(error));
  };



  return (
    <div className="w-full  mx-auto">
      <div className="text-center mb-8">
        <ProLogo />
        <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
          Create Account
        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                {...register('firstName', { required: true })}
                type="text"
                id="firstName"
                placeholder="John"
                className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                {...register('lastName', { required: true })}
                type="text"
                id="lastName"
                placeholder="Doe"
                className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder="name@example.com"
              autoComplete="email"
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            {
              errors.email?.type === 'required && <p> email is required <p/>'
            }
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register('password', { required: true, minLength: 6 })}
              type="password"
              id="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            {
              errors.password?.type === 'required && <p> password is required <p/>'
            }
            {
              errors.password?.type === 'minLength' && <p>password must be 6 character</p>
            }

          </div>

          {/* for seller */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Register As
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="user"
                  {...register("role")}
                  defaultChecked
                />
                User
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="seller"
                  {...register("role")}
                />
                Seller
              </label>
            </div>
          </div>



          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-emerald-600 hover:underline font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-emerald-600 hover:underline font-medium">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>


        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>









          <div className="mt-6">
            <SocialLogin selectedRole={selectedRole} />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Register;