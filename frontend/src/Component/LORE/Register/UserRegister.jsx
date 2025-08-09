import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    phoneNumber: "",
    emailId: "",
    gender: "",
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
      `${import.meta.env.VITE_BACKEND_URL}/registration/addUser`,
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

    if (data.register) {
      sessionStorage.setItem("register", "true");
      const raj = navigate("/UserRegisterSuccess");
      console.log(raj);
    } else {
      sessionStorage.setItem("register", "false");
      alert("No user register!");
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
            name="username"
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
            Age
          </label>
          <input
            name="age"
            type="number"
            placeholder="Age"
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
          <label className="text-white block text-sm font-medium m-auto">
            Gender
          </label>
          <select
            name="gender"
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-white/20 bg-opacity-50 focus:outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
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

export default UserRegister;
