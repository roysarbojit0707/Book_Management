import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const AddAddress = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "home",
    username: "",
    id: 0,
  });

  const Navigate = useNavigate();
  const [triggerSave, setTriggerSave] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const SaveAddress = async (e) => {
    e.preventDefault(); // Prevent default form submission

    let userNameOfUser = sessionStorage.getItem("UserUserName");

    try {
      const responseUserId = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/UserDetails/UserID?username=${userNameOfUser}`
      );
      const dataUserId = await responseUserId.json();

      setFormData((prevData) => ({
        ...prevData,
        username: userNameOfUser,
        id: dataUserId,
      }));

      // Set flag to trigger final save once state is updated
      setTriggerSave(true);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  useEffect(() => {
    if (triggerSave && formData.id !== 0) {
      finalSave();
      setTriggerSave(false); // Reset the trigger
    }
  }, [formData.id, triggerSave]); // Run when id is updated

  const finalSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/UserDetails/UserAddressSave`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Navigate("/Main/DeliveryAddress");
      } else {
        console.error("Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-violet-100 dark:bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Add Address
      </h2>
      <form className="space-y-3" onSubmit={SaveAddress}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        />
        <input
          type="text"
          name="phone"
          placeholder="10-digit mobile number"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        />
        <input
          type="text"
          name="locality"
          placeholder="Locality"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        />
        <textarea
          name="address"
          placeholder="Address (Area and Street)"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        ></textarea>
        <input
          type="text"
          name="city"
          placeholder="City/District/Town"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        />
        <select
          name="state"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        >
          <option value="">--Select State--</option>
          {statesOfIndia.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="landmark"
          placeholder="Landmark (Optional)"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        />
        <input
          type="text"
          name="alternatePhone"
          placeholder="Alternate Phone (Optional)"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        />

        <div className="mb-4 flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="addressType"
              value="home"
              checked={formData.addressType === "home"}
              onChange={handleChange}
              className="dark:bg-gray-700"
            />
            <span className="text-gray-800 dark:text-gray-300">
              Home (All day delivery)
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="addressType"
              value="work"
              checked={formData.addressType === "work"}
              onChange={handleChange}
              className="dark:bg-gray-700"
            />
            <span className="text-gray-800 dark:text-gray-300">
              Work (Delivery between 10 AM - 5 PM)
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-lg shadow-md hover:bg-orange-600"
        >
          Save Address
        </button>
        <button
          type="button"
          onClick={() => Navigate("/Main/DeliveryAddress")}
          className="w-full text-center text-gray-700 dark:text-gray-300 p-3 mt-2 hover:underline cursor-pointer"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
