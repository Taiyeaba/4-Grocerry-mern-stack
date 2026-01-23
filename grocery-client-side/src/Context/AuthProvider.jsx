import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';
import { GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase.config";



const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
const [user,setUser] = useState(null);
const [loading,setLoading] = useState(true);
const [role, setRole] = useState(null);


const createUser = (email,password)=>{
  setLoading(true);
  return createUserWithEmailAndPassword(auth,email,password);
}

const signIn = (email,password) => {
   setLoading(true);
  return signInWithEmailAndPassword(auth,email,password);
}


const SignInWithGoogle = () =>{
  setLoading(true);
  return signInWithPopup(auth,googleProvider);
}



const logOut = ()=>{
  setLoading(true);
  return signOut(auth);
}


useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRole(docSnap.data().role);
      }
    } else {
      setRole(null);
    }

    setLoading(false);
  });

  return () => unSubscribe();
}, []);




const authInfo = {
  createUser,signIn,user,loading,logOut,SignInWithGoogle, role, 
}



  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;