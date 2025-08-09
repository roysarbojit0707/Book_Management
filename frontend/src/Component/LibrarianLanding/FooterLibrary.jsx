import React from "react";
import { Link } from "react-router-dom";
export default function FooterLibrary() {
  return (
    <footer className="dark:bg-gray-800 bg-white border-y dark:text-gray-200">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <p className="text-sm">&copy; 2025 Lando. All rights reserved.</p>
        <ul className="flex justify-center space-x-6 mt-2">
          <li>
            <Link
              to="/privacy"
              className="hover:underline dark:hover:text-white"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:underline dark:hover:text-white">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:underline dark:hover:text-white"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
