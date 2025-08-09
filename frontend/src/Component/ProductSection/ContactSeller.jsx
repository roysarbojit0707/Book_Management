import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactSeller = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
    sellerEmail: "",
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
    formData.sellerEmail = sessionStorage.getItem("sellerEmail");
    console.log(formData.sellerEmail);
    console.log(formData);
    if (sessionStorage.getItem("isVerified") != "true") {
      alert("Please verify the OTP first");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/mailSenderSeller/sendMailSeller",
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
      const response = await fetch("http://localhost:8080/verify/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otp.otp, username: formData.username }),
      });
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-violet-200 to-violet-400 text-black p-6 md:p-16">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col justify-center p-6 md:p-12 bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold text-violet-700 mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Feel free to contact us any time. We will get back to you as soon as
          we can!
        </p>
        <form className="space-y-4" onSubmit={formSubmit}>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-4 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={handleSendOtp}
            className="bg-violet-400 w-20 h-7 mt-1 rounded-lg font-semibold text-white hover:bg-violet-600 transition ease-in-out duration-300"
          >
            Send OTP
          </button>
          <input
            type="number"
            name="otp"
            id="otp"
            placeholder="OTP via Email"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-violet-200 border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:border-2 focus:outline-none"
            onChange={otpChange}
            required
          />
          <button
            onClick={verifyOTP}
            className="bg-violet-400 w-20 h-7 mt-1 rounded-lg font-semibold text-white hover:bg-violet-600 transition ease-in-out duration-300"
          >
            Verify
          </button>
          <textarea
            name="message"
            onChange={handleChange}
            placeholder="Message"
            className="w-full p-4 border border-violet-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-violet-500"
          ></textarea>
          <button className="w-full p-4 bg-violet-700 text-white font-semibold rounded-lg hover:bg-violet-900 transition duration-300 shadow-md">
            SEND
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-black text-white p-6 md:p-12 rounded-lg shadow-lg relative flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">Info</h2>
        <div className="space-y-6 text-lg">
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-yellow-400" />{" "}
            <span>info@getintouch.we</span>
          </div>
          <div className="flex items-center gap-4">
            <FaPhone className="text-yellow-400" /> <span>+24 56 89 146</span>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-yellow-400" />{" "}
            <span>14 Greenroad St.</span>
          </div>
          <div className="flex items-center gap-4">
            <FaClock className="text-yellow-400" /> <span>09:00 - 18:00</span>
          </div>
        </div>
        <div className="absolute top-0 left-0 bg-yellow-400 w-6 h-6 rounded-full"></div>
        <div className="absolute bottom-0 right-0 bg-yellow-400 w-12 h-12 rounded-full"></div>
      </div>
    </div>
  );
};

export default ContactSeller;
