import React, { useState } from "react";
import { Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { MdCollections } from "react-icons/md";

const Dropdown = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 hover:opacity-80 duration-300"
      >
        <img
          src={user.photoURL || "https://i.ibb.co/QPJ7Fn5/user.png"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-400"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-900 shadow-lg 
                        rounded-xl py-3 z-50 border border-gray-200 dark:border-gray-700 
                        animate-scale-in"
        >
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="font-semibold">{user.displayName || "User"}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {user.email}
            </p>
          </div>

          <ul className="py-2">
            <li>
              <Link
                to="/movies/my-collection"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 
                           dark:hover:bg-gray-800"
              >
                <MdCollections size={18} />
                My Collection
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left 
                           hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <IoLogOutOutline size={18} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
