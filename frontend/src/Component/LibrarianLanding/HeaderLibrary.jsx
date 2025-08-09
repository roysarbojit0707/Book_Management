import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Library,
  User,
  Profile,
  Setting,
  Help,
  Logout,
  Search,
} from "../index";
import ThemeBtn from "../MainPages/ThemeBtn";
import { useState } from "react";

export default function HeaderLibrary() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLibrarianLogin =
      sessionStorage.getItem("isLibrarianLogin") === "true";
    if (!isLibrarianLogin) {
      console.log("No Librarian is logged in. Redirecting to userLogin...");
      navigate("/LibraryLoginPage");
    }
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigateToLogout = useNavigate();
  const LogoutLibrarian = () => {
    sessionStorage.removeItem("LibrarianUserName");
    navigateToLogout("/LibraryLoginPage", { replace: true });
  };
  return (
    <header className="shadow sticky z-50 top-0 bg-white dark:bg-gray-900">
      {/* <div className="min-h-screen bg-white dark:bg-gray-900 font-sans flex flex-col justify-between"> */}
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-md dark:shadow-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Lando
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/home"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              Contact
            </Link>
          </li>
        </ul>
        <ThemeBtn />
        <div className="relative">
          <img
            src={User}
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleMenu}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
              <div className="p-4 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600">
                <img
                  src={User}
                  alt="User"
                  className="w-12 h-12 rounded-full dark:brightness-90"
                />
                <h3>
                  <Link to="/Profile/Me" className="hover:underline">
                    Me
                  </Link>
                </h3>
              </div>
              <div className="p-2">
                <Link
                  to={"/Main/Setting/EditSection"}
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={Profile}
                    alt="Edit"
                    className="w-6 h-6 mr-2 dark:brightness-90"
                  />{" "}
                  Edit Profile
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={Setting}
                    alt="Settings"
                    className="w-6 h-6 mr-2 dark:brightness-90"
                  />
                  Settings & Privacy
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={Help}
                    alt="Help"
                    className="w-6 h-6 mr-2 dark:brightness-90"
                  />{" "}
                  Help & Support
                </Link>
                <Link
                  onClick={LogoutLibrarian}
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={Logout}
                    alt="Logout"
                    className="w-6 h-6 mr-2 dark:brightness-90"
                  />{" "}
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* </div> */}
    </header>
  );
}
