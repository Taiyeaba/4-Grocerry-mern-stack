import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 overflow-hidden">
      
      {/* Geometric Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-100/40 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0001_1px,transparent_1px),linear-gradient(to_bottom,#0001_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="relative z-10 space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-200 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Fresh Every Day
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              <span className="block">Farm to Table,</span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Delivered Fresh
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Experience the convenience of premium grocery shopping. 
              Fresh produce, organic selections, and household essentials 
              delivered straight to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <Link to='/all-products'>
                <span className="relative z-10">Start Shopping</span>
                </Link>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-3 h-full bg-white/20 skew-x-[-20deg] group-hover:animate-shine"></div>
              </button>
              
              <button className="group px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-all duration-300">
                <span className="flex items-center justify-center gap-2">
                  Watch Demo
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">10k+</div>
                <div className="text-sm text-slate-500">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">500+</div>
                <div className="text-sm text-slate-500">Fresh Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">24/7</div>
                <div className="text-sm text-slate-500">Delivery Service</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visuals */}
          <div className="relative lg:h-[600px]">
            {/* Main Image Container */}
            <div className="relative h-full flex items-center justify-center">
              
              {/* Floating Image Cards */}
              <div className="absolute left-0 top-1/4 w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                  alt="Fresh Vegetables"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
              </div>

              <div className="absolute right-0 top-1/2 w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://i.ibb.co.com/Kpbt7Pgy/2d4ea32ed14a1f75cf1b454748dfa99cd4a1fa62.jpg"
                  alt="Fresh Fruits"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
              </div>

              <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
                  alt="Grocery Collection"
                  className="w-full h-full object-cover"
                />
                {/* Badge on Image */}
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  NEW
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 opacity-20 blur-xl"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-gradient-to-br from-teal-300 to-emerald-200 opacity-20 blur-xl"></div>
            </div>

           
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 52C120 44 240 28 360 20C480 12 600 12 720 20C840 28 960 44 1080 52C1200 60 1320 60 1380 60H1440V120H0V60Z" 
                fill="white" 
                fillOpacity="0.8"/>
        </svg>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-shine {
          animation: shine 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Banner;