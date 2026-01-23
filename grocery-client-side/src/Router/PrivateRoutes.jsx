import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader';

const PrivateRoutes = ({children}) => {

const {user,loading} = UseAuth();
const location = useLocation();
if(loading){
  return <Loader/>
}
if(!user){
  return <Navigate 
  state={{from:location.pathname}}
  to='/auth/login'/>
}

  return children;
};

export default PrivateRoutes;