import Lottie from 'lottie-react';
import React from 'react';
import { Outlet } from 'react-router';
import register from '../assets/Animation - 1749883313227.json';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Animation */}
          <div className="lg:w-1/2 bg-gradient-to-br from-emerald-500 to-teal-600 p-8 md:p-12 flex items-center justify-center">
            <div className="text-center">
              <Lottie 
                animationData={register} 
                className="max-w-md mx-auto"
                loop={true} 
              />
              <h2 className="text-3xl font-bold text-white mt-6 mb-3">
                Welcome to FreshMart
              </h2>
              <p className="text-emerald-100 text-lg">
                Your gateway to fresh groceries and seamless shopping
              </p>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-8 md:p-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;