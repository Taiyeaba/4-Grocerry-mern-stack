import React, { useEffect, useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { deleteUser, getAuth, updatePassword } from "firebase/auth";
import Swal from "sweetalert2"; // 🔹 SweetAlert2 import

const MyProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Profile load error:", err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const getInitials = () => {
    if (!dbUser) return "U";
    const f = dbUser.firstName || "";
    const l = dbUser.lastName || "";
    if (f && l) return `${f[0]}${l[0]}`.toUpperCase();
    if (f) return f[0].toUpperCase();
    if (l) return l[0].toUpperCase();
    if (user?.displayName) return user.displayName[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  const handleUpdateProfile = async () => {
    await axiosSecure.patch(`/users/${user.email}`, { firstName, lastName });
    setDbUser({ ...dbUser, firstName, lastName });
    setIsEditing(false);
    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your profile has been successfully updated",
    });
  };

  const handleChangePassword = async (newPass) => {
    if (!newPass) return;
    try {
      await updatePassword(getAuth().currentUser, newPass);
      Swal.fire({
        icon: "success",
        title: "Password Changed",
        text: "Your password has been successfully changed",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete your account permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${user.email}`);
        await deleteUser(getAuth().currentUser);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your account has been deleted.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-3 text-red-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-medium">No profile data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Welcome back, {dbUser.firstName}!</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-4xl font-bold text-white">{getInitials()}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{dbUser.firstName} {dbUser.lastName}</h2>
                <p className="text-gray-500">{dbUser.email}</p>
              </div>

              {/* Role */}
              <div className="text-center mb-6">
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  dbUser.role === 'admin'
                    ? 'bg-red-100 text-red-700'
                    : dbUser.role === 'manager'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {dbUser.role.toUpperCase()}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{new Date(dbUser.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Last Login</span>
                  <span className="font-medium">{new Date(dbUser.lastLogin).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Status</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Active</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h3>

              {/* Personal Info */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Personal Details</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                      <div className="md:col-span-2 flex gap-4">
                        <button
                          onClick={handleUpdateProfile}
                          className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg">
                          <p className="font-medium">{dbUser.firstName || 'Not set'}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg">
                          <p className="font-medium">{dbUser.lastName || 'Not set'}</p>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-between">
                      <p className="font-medium">{dbUser.email}</p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Account Details</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Created</label>
                    <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg">
                      <p className="font-medium">
                        {new Date(dbUser.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
                    <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg">
                      <p className="font-medium">
                        {new Date(dbUser.lastLogin).toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Actions</h4>
                <div className="flex flex-wrap gap-4">
                  {!isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setFirstName(dbUser.firstName);
                        setLastName(dbUser.lastName);
                      }}
                      className="px-6 py-3 border border-emerald-600 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      Edit Profile
                    </button>
                  )}
                  <button
                    onClick={() => handleChangePassword(prompt("Enter new password"))}
                    className="px-6 py-3 border border-emerald-600 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Change Password
                  </button>

                  <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-3 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleDateString()} • Contact support for any account issues</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;