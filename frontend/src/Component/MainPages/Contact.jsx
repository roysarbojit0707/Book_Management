import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    tel: "",
    message: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (formData.email == "") {
      alert("Please fill the email field first");
    } else if (formData.username == "") {
      alert("Please fill the username field first");
    } else {
      setLoading(true);
      try {
        const sendOTPResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/mail/sendOtp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              username: formData.username,
            }),
          }
        );
        const data = await sendOTPResponse.json();
        console.log(data);
        setLoading(false);
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
  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (sessionStorage.getItem("isVerified") != "true") {
      alert("Please verify the OTP first");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/mail/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.isContactMailSend) {
        sessionStorage.setItem("isContactMailSend", "true");
        setFormData({});
        navigate("/MailSuccess");
      } else {
        alert(
          "Message not send!!! Please fill the form correcty or try again later"
        );
      }
    } catch (error) {
      console.log("Error:- ", error);
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
          body: JSON.stringify({ otp: otp.otp, username: formData.username }),
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
    <div className="relative flex items-top justify-center min-h-[700px] bg-violet-100 dark:bg-gray-900 sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 mr-2 bg-violet-200 dark:bg-gray-800 sm:rounded-lg">
              <h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                Get in touch:
              </h1>
              <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mt-2">
                Fill in the form to start a conversation
              </p>
            </div>
            <form
              className="p-6 flex flex-col justify-center"
              onSubmit={formSubmit}
            >
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-violet-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white font-semibold focus:border-orange-500 focus:border-2 focus:outline-none"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-violet-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white font-semibold focus:border-orange-500 focus:border-2 focus:outline-none"
                onChange={handleChange}
                required
              />
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className={`bg-violet-400 dark:bg-blue-600 w-20 h-7 mt-1 rounded-lg font-semibold text-white 
    ${
      loading
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-violet-600 dark:hover:bg-blue-500"
    } transition ease-in-out duration-300`}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
              {loading && (
                <p className="text-sm text-gray-600 mt-1">
                  Please wait, sending OTP...
                </p>
              )}

              <input
                type="number"
                name="otp"
                placeholder="OTP via Email"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-violet-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white font-semibold focus:border-orange-500 focus:border-2 focus:outline-none"
                onChange={otpChange}
                required
              />
              <button
                onClick={verifyOTP}
                className="bg-violet-400 dark:bg-blue-600 w-20 h-7 mt-1 rounded-lg font-semibold text-white hover:bg-violet-600 dark:hover:bg-blue-500 transition ease-in-out duration-300"
              >
                Verify
              </button>
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-violet-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white font-semibold focus:border-orange-500 focus:border-2 focus:outline-none"
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="md:w-32 bg-orange-700 dark:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 dark:hover:bg-blue-500 transition ease-in-out duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
