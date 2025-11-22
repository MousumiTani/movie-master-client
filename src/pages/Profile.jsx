import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = "My Profile";
  }, []);

  if (!user) return <div className="text-center py-8">No user found.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-gray-300 dark:bg-gray-700 p-6 m-8 rounded">
      <img
        src={user.photoURL || ""}
        alt=""
        className="w-24 h-24 rounded-full mb-4"
      />
      <p className="mb-2">
        <strong>Name:</strong> {user.displayName || "Not set"}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mb-2">
        <strong>Photo URL:</strong> {user.photoURL || "Not set"}
      </p>
    </div>
  );
};

export default Profile;
