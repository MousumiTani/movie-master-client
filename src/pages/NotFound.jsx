import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 text-center">
      <h1 className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
