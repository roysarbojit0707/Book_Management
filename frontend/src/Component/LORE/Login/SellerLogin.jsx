import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Library } from "../../index";
import {
  FaGoogle,
  FaApple,
  FaFacebook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function SellerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const navigate = useNavigate();
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/login/sellerLogin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.isValidSeller == "true") {
      sessionStorage.setItem("isValidSeller", "true");
      sessionStorage.setItem("userNameForSeller", data.username);
      console.log("Navigating to /Main...");
      console.log(data.username);
      navigate("/Main");
    } else {
      alert("User not Register");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl text-center">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
            <img src={Library} alt="" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome back
        </h2>
        <p className="text-gray-500 text-sm dark:text-gray-400">
          Please enter your details to sign in
        </p>

        <form>
          <div className="flex gap-3 my-4">
            <button className="flex-1 border rounded-lg p-2 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaGoogle size={20} />
            </button>
            <button className="flex-1 border rounded-lg p-2 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaApple size={20} />
            </button>
            <button className="flex-1 border rounded-lg p-2 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaFacebook size={20} />
            </button>
          </div>

          <div className="text-gray-400 my-4 text-sm">or</div>

          <div className="text-left">
            <label
              htmlFor="userName"
              className="text-gray-700 dark:text-gray-300 text-sm"
            >
              UserName
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              onChange={handelChange}
            />
          </div>

          <div className="text-left mt-4 relative">
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-300 text-sm"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                id="password"
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                onChange={handelChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-400"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm">
            <label className="flex items-center text-gray-600 dark:text-gray-400">
              <input type="checkbox" className="mr-2" /> Remember for 30 days
            </label>
            <a href="#" className="text-purple-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            onClick={handelSubmit}
            className="w-full mt-6 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-all"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link
            to={"/SellerRegister"}
            className="text-purple-500 hover:underline"
          >
            Create account
          </Link>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Want to Login as User?{" "}
          <Link to={"/userLogin"} className="text-purple-500 hover:underline">
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SellerLogin;
