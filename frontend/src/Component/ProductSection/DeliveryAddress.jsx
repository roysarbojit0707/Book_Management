import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryAddress = () => {
  const [addresses, setAddress] = useState([]);
  const fetchAddress = async () => {
    let userNameOfUser = sessionStorage.getItem("UserUserName");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/UserDetails/GetUserDetails?username=${userNameOfUser}`
      );
      const data = await response.json();
      setAddress(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [bookPrice, setBookPrice] = useState(0);
  const [packingPrice, setPackingPrice] = useState(29);
  const [totalPrice, setTotalPrice] = useState(0);
  const Navigate = useNavigate();
  useEffect(() => {
    setBookPrice(Number(sessionStorage.getItem("bookPrice")));
    setTotalPrice(Number(sessionStorage.getItem("bookPrice")) + packingPrice);
  }, []);
  const AddDeliveryAddress = () => {
    Navigate("/Main/AddAddress");
  };
  const PaymentGetway = () => {
    if (addresses.length !== 0) {
      Navigate("/PaymentGetway");
    } else {
      alert("Please add delivery address first");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-200 to-violet-300 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-gray-900 dark:text-white">
        {/* Login Section */}
        <div className="border p-4 rounded-md mb-4 bg-gray-100 dark:bg-gray-700">
          <h2 className="font-semibold text-lg">Login ✅</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Raj Mukherjee +919382530377
          </p>
          <button className="border px-4 py-1 mt-2 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Change
          </button>
        </div>

        {/* Delivery Address */}
        <div className="border p-4 rounded-md mb-4 bg-gray-100 dark:bg-gray-700">
          <h2 className="font-semibold text-lg mb-2">Delivery Address</h2>
          {addresses.map((add, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-300">
                  Name: {add.name}
                  <br />
                  phone: {add.phone}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {add.address}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Pincode: {add.pincode}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Landmark: {add.landmark}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  State: {add.state}
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={PaymentGetway}
            className="mt-2 font-semibold bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer"
          >
            Deliver Here
          </button>
          <button
            onClick={AddDeliveryAddress}
            className="mt-2 ml-1 font-semibold bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
          >
            Add Delivery Address
          </button>
        </div>

        {/* Price Details */}
        <div className="border p-4 rounded-md bg-gray-100 dark:bg-gray-700">
          <h2 className="font-semibold text-lg mb-2">Price Details</h2>
          <p className="flex justify-between">
            Price (1 item) <span>₹{bookPrice}</span>
          </p>
          <p className="flex justify-between">
            Delivery Charges <span className="text-green-500">₹40 FREE</span>
          </p>
          <p className="flex justify-between">
            Packaging Charge <span>₹{packingPrice}</span>
          </p>
          <hr className="my-2 border-gray-300 dark:border-gray-600" />
          <p className="flex justify-between font-semibold">
            Total Payable <span>₹{totalPrice}</span>
          </p>
          <p className="text-green-500 text-sm">
            Your Total Savings on this order ₹3,571
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
