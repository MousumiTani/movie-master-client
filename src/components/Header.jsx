import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router";
import AuthContext from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "./Button";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <nav className="bg-gradient-to-r from-gray-600 to-gray-900 text-gray-300 transition-colors duration-500 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-gray-300 text-4xl font-[cursive] animate-pulse">
            𝓜𝓸𝓿𝓲𝓮𝓜𝓪𝓼𝓽𝓮𝓻
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-3">
          <div className="ml-4">
            <input
              type="checkbox"
              className="toggle toggle-sm bg-amber-50"
              defaultChecked={theme === "dark"}
              onChange={(e) => handleTheme(e.target.checked)}
            />
          </div>
          <ul className="flex space-x-6 items-center text-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-white pb-1" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-movies"
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-white pb-1" : ""
                }
              >
                All Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-collection"
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-white pb-1" : ""
                }
              >
                My Collection
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink
                    to="/movies/add"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-white pb-1" : ""
                    }
                  >
                    Add Movie
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-watchlist"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-white pb-1" : ""
                    }
                  >
                    My Watchlist
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center space-x-3 relative">
            {user ? (
              <>
                <div className="relative">
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-10 w-10 rounded-full cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 w-40 bg-gray-800 py-2 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="primary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleSidebar}>
            {sidebarOpen ? (
              <HiX className="w-8 h-8" />
            ) : (
              <HiMenu className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 z-50 transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Menu</h2>
          <button onClick={toggleSidebar}>
            <HiX className="w-8 h-8" />
          </button>
        </div>

        <ul className="flex flex-col space-y-4 mt-4 px-4">
          <li>
            <NavLink
              to="/"
              onClick={toggleSidebar}
              className="block text-gray-200 hover:text-white"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-movies"
              onClick={toggleSidebar}
              className="block text-gray-200 hover:text-white"
            >
              All Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-collection"
              onClick={toggleSidebar}
              className="block text-gray-200 hover:text-white"
            >
              My Collection
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to="/movies/add"
                  onClick={toggleSidebar}
                  className="block text-gray-200 hover:text-white"
                >
                  Add Movie
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-watchlist"
                  onClick={toggleSidebar}
                  className="block text-gray-200 hover:text-white"
                >
                  My Watchlist
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {user ? (
          <div className="mt-8 px-4 border-t border-gray-700 pt-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={user.photoURL}
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <span className="text-gray-200">
                {user.displayName || user.email}
              </span>
            </div>
            <Link
              to="/profile"
              onClick={toggleSidebar}
              className="block text-gray-200 hover:text-white"
            >
              Profile
            </Link>
            <Link
              to="/"
              onClick={toggleSidebar}
              className="block text-gray-200 hover:text-white"
            >
              Settings
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                toggleSidebar();
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="mt-8 px-4 flex flex-col space-y-4">
            <Link to="/login" onClick={toggleSidebar}>
              <Button variant="primary" size="md">
                Login
              </Button>
            </Link>
            <Link to="/register" onClick={toggleSidebar}>
              <Button variant="outline" size="md">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
