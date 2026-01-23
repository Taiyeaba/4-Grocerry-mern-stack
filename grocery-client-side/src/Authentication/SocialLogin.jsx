import React from "react";
import UseAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase.config";
import UseAxios from "../Hooks/UseAxios";

const SocialLogin = ({ selectedRole }) => {
  const navigate = useNavigate();
  const axiosInstance = UseAxios();
  const { SignInWithGoogle } = UseAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await SignInWithGoogle();
      const user = result.user;

      // Firestore reference
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      let role;

      // Safe split for first & last name
      const fullName = user.displayName || "Google User";
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "Google";
      const lastName = nameParts.slice(1).join(" ") || "User";

      if (!snap.exists()) {
        // 🆕 FIRST TIME GOOGLE REGISTER
        role = selectedRole || "user";

        // Save to Firestore
        await setDoc(
          userRef,
          {
            email: user.email,
            role,
            firstName,
            lastName,
            createdAt: new Date(),
          },
          { merge: true }
        );

        // Save to MongoDB
        await axiosInstance.post("/users", {
          email: user.email,
          role,
          firstName,
          lastName,
          created_at: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
      } else {
        // 🔁 GOOGLE LOGIN (EXISTING USER)
        role = snap.data().role;

        // MongoDB update lastLogin + names if missing
        await axiosInstance.post("/users", {
          email: user.email,
          role,
          firstName,
          lastName,
          lastLogin: new Date().toISOString(),
        });
      }

      // Navigate after login
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="w-full flex items-center gap-2 justify-center my-3 bg-white border py-2.5 rounded-full"
    >
      <img
        className="h-4 w-4"
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
        alt="google"
      />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
