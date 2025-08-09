import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function UserRegisterSuccess() {
  const Navigate = useNavigate();
  useEffect(() => {
    const isRegister = sessionStorage.getItem("register");
    if (isRegister == "true") {
      const timer = setTimeout(() => {
        Navigate("/userLogin");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      Navigate("/UserRegister");
    }
  }, []);
  return (
    <div className="flex items-center justify-center bg-violet-100">
      <div className="container mx-auto p-6 bg-violet-100 shadow-lg rounded-lg max-w-md text-center">
        <h1 className="text-green-500 text-2xl font-semibold">
          User Register Successfully
        </h1>
        <p className="text-gray-700 text-base break-words">
          Thanks for your registration as a User.
        </p>
        <Link
          to="/userLogin"
          className="mt-6 inline-block text-white bg-green-500 py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
        >
          Go to User Login Page
        </Link>
      </div>
    </div>
  );
}

export default UserRegisterSuccess;
