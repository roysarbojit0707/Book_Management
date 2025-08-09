import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerRegister() {
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    userName: "",
    password: "",
    name: "",
    phoneNumber: "",
    emailId: "",
  });
  const handleChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(registerFormData);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/registration/addSeller`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
      }
    );
    const data = await response.json();
    console.log(data);

    if (data.isRegisterSeller) {
      sessionStorage.setItem("isRegisterSeller", "true");
      const raj = navigate("/SellerRegisterSuccess");
      console.log(raj);
    } else {
      sessionStorage.setItem("isRegisterSeller", "false");
      alert("No user register!");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (registerFormData.email == "") {
      alert("Please fill the email field first");
    } else if (registerFormData.username == "") {
      alert("Please fill the username field first");
    } else {
      try {
        const sendOTPResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/mail/sendOtp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: registerFormData.emailId,
              username: registerFormData.userName,
            }),
          }
        );
        const data = await sendOTPResponse.json();
        console.log(data);
        if (data.isMailSend) {
          alert("OTP send to your email");
        } else {
          alert("OTP not send!!! Please try again later");
        }
      } catch (error) {
        console.log("Error:- ", error);
      }
    }
  };
  const [otp, setOtp] = useState({ otp: "" });
  const otpChange = (e) => {
    setOtp({ otp: e.target.value });
  };
  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/verify/verifyOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: otp.otp,
            username: registerFormData.userName,
          }),
        }
      );
      const result = await response.json();
      if (result.isVerified == 2) {
        alert("OTP Verified");
        sessionStorage.setItem("isVerified", "true");
      } else if (result.isVerified == 1) {
        alert("OTP is incorrect");
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.log("Error:- ", error);
    }
  };
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center min-h-screen">
      <div className="bg-white/20 bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          Register
        </h2>
        <form onSubmit={handelSubmit} className="space-y-4">
          <label className="text-white block text-sm font-medium m-auto">
            Username
          </label>
          <input
            name="userName"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-white/30 bg-opacity-50 focus:outline-none"
            required
          />
          <label className="text-white block text-sm font-medium m-auto">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-white/20 bg-opacity-50 focus:outline-none"
            required
          />
          <label className="text-white block text-sm font-medium m-auto">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-white/20 bg-opacity-50 focus:outline-none"
            required
          />
          <label className="text-white block text-sm font-medium m-auto">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-white/20 bg-opacity-50 focus:outline-none"
            required
          />
          <label className="text-white block text-sm font-medium m-auto">
            Email ID
          </label>
          <input
            name="emailId"
            type="email"
            placeholder="Email ID"
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-white/20 bg-opacity-50 focus:outline-none"
            required
          />
          <button
            onClick={handleSendOtp}
            className="bg-violet-500 w-20 h-7 mt-1 rounded-lg font-semibold text-white hover:bg-violet-600 transition ease-in-out duration-300"
          >
            Send OTP
          </button>

          <div className="flex flex-col mt-2">
            <label htmlFor="otp" className="hidden">
              OTP
            </label>
            <input
              type="number"
              name="otp"
              id="otp"
              placeholder="OTP via Email"
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white/20 border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:border-2 focus:outline-none"
              onChange={otpChange}
              required
            />
          </div>
          <button
            onClick={verifyOTP}
            className="bg-violet-500 w-20 h-7 mt-1 rounded-lg font-semibold text-white hover:bg-violet-600 transition ease-in-out duration-300"
          >
            Verify
          </button>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellerRegister;
