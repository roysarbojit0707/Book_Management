import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Library, LoginPage } from "../../index";

function UserLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/login/userLogin`,
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
    if (data.exists) {
      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("UserUserName", formData.username);
      navigate("/Main");
    } else {
      alert("User not Register");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl">
        <div className="w-1/2 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-4xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
              <img src={Library} alt="Logo" />
            </div>
            <h1 className="text-gray-500 dark:text-gray-300 mt-2">
              Welcome to the Bookie App
            </h1>
          </div>

          <button className="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5 h-5 mr-2"
              alt="Google Logo"
            />
            Sign in with Google
          </button>

          <div className="text-center text-gray-400 dark:text-gray-500 my-4">
            or Sign in with Email
          </div>

          <form onSubmit={handelSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                onChange={handelChange}
                name="username"
                id="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-gray-300"
              >
                Password*
              </label>
              <input
                type="password"
                onChange={handelChange}
                name="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-indigo-500 dark:bg-gray-700"
                />
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-indigo-500 text-sm dark:text-indigo-400"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Not registered yet?{" "}
            <Link
              to="/userRegister"
              className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
            >
              Create an Account
            </Link>
          </p>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Are you a Seller?{" "}
            <Link
              to="/SellerLogin"
              className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
            >
              Login as Seller
            </Link>
          </p>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Are you a Librarian & want to add your Library?{" "}
            <Link
              to="/LibraryLoginPage"
              className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
            >
              Login as Librarian
            </Link>
          </p>
        </div>

        {/* Right: Promo Section */}
        <div className="w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 flex flex-col justify-center relative">
          <h2 className="text-2xl font-bold">Are you a Book lover?</h2>
          <p className="text-sm mt-2">
            Join us and buy your favorite books by just one click.
          </p>
          <div className="absolute top-6 right-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold">Try Bookie</h3>
            <p className="text-lg font-bold">More than 172,832 Customers</p>
          </div>
          <img className="w-100 h-80" src={LoginPage} alt="PNG" />
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
