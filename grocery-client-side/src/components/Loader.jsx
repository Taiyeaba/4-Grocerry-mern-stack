import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen space-x-2">
      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce delay-150"></div>
      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

export default Loader;
