import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LibrarianRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    mailId: "",
    ph: "",
    password: "",
  });
  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/librarian/addLibrarian`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.isAdded) {
        sessionStorage.setItem("isLibrarianRegister", "true");
        toast.success("✅ Successfully Registered!", {
          position: "top-right",
          onClose: () => navigate("/LibraryLoginPage"), // Navigate after toast disappears
        });
      } else {
        sessionStorage.setItem("isLibrarianRegister", "false");
        toast.error("❌ Registration Failed!", { position: "top-right" });
      }
    } catch (err) {
      console.log(err);
      toast.error("❌ Something went wrong!", { position: "top-right" });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-400 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center text-cyan-600 dark:text-cyan-400 mb-4">
          • Registration Form •
        </h2>
        <form onSubmit={handelSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handelChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              name="mailId"
              onChange={handelChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone Number"
              name="ph"
              onChange={handelChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              name="password"
              id="password"
              onChange={handelChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-400"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <button className="w-full bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 dark:hover:bg-cyan-700 transition">
            CREATE ACCOUNT
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to={"/LibraryLoginPage"}
            className="text-cyan-500 hover:underline dark:text-cyan-400"
          >
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
