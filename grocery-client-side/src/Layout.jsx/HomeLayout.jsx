import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const HomeLayout = () => {
  return (
    <div>
      
        <Navbar/>
      
      <main className=''>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default HomeLayout;