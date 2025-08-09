import React from "react";
import { Link } from "react-router-dom";

export default function HomeLibrary() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-6">
        <p className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-300 mt-20">
          Start to add your Library
        </p>
        <h2 className="text-5xl font-bold my-4 text-gray-900 dark:text-white">
          The best way to manage your library
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Here you can add your library details
        </p>

        <div className="mt-6">
          <Link
            to="/Library/AddLibrary"
            className="bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg shadow-lg dark:shadow-white/10"
          >
            Add Library
          </Link>
        </div>
      </div>
    </div>
  );
}
