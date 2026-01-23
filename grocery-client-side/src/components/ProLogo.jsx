import React from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router';
const ProLogo = () => {
  return (
    <div>
       <div className="flex items-center">
              <NavLink to="/" className="flex items-center">
                <img 
                  src={logo} 
                  alt="Grocery Logo" 
                  className="h-14 w-auto object-contain"
                />
               
              </NavLink>
            </div>
    </div>
  );
};

export default ProLogo;