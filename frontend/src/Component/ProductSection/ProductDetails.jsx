import React, { useEffect, useState } from "react";
import { sellerContact } from "../index";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const [sellerDetailsComponent, setSellerDetailsComponent] = useState(false);
  const [sellerDetails, setSellerDetails] = useState({});
  const [sellerUsername, setSellerUsername] = useState("");
  let book = sessionStorage.getItem("bookDetails");
  const [bookDetails, setBookDetails] = useState("");
  const [dataFetch, setDataFetch] = useState({});
  const Navigate = useNavigate();

  useEffect(() => {
    if (book) {
      setSellerUsername(sessionStorage.getItem("SellerName"));
      setBookDetails(book);
    }
  }, []);

  useEffect(() => {
    if (bookDetails) {
      fetchData();
    }
  }, [bookDetails]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/fetchSellers/idMatched?id=${bookDetails}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setDataFetch(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSellerDetails = async () => {
    try {
      console.log(sellerUsername);
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/fetchSellers/getSellerName?userName=${sellerUsername}`
      );
      const data = await response.json();
      setSellerDetails(data);
      setSellerDetailsComponent(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sellerDetails.emailId) {
      sessionStorage.setItem("sellerEmail", sellerDetails.emailId);
      console.log("Seller email stored:", sellerDetails.emailId);
    }
  }, [sellerDetails]);

  const AddressPage = () => {
    sessionStorage.setItem("bookPrice", dataFetch.price);
    Navigate("/Main/DeliveryAddress");
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto p-6 shadow-lg rounded-lg flex">
        <div className="w-2/3 p-4">
          <h1 className="text-3xl font-bold">{dataFetch.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Author: {dataFetch.author}
          </p>
          <p className="text-2xl font-semibold text-green-600 mt-2">
            {dataFetch.price}/-
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Special Offer: 10% off on first purchase
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Available Offers</h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>Bank Offer: 5% Cashback on XYZ Bank Credit Card</li>
              <li>Bank Offer: 10% off up to ₹1500 on orders over ₹5000</li>
              <li>Partner Offer: Buy 3 books, get 1 free</li>
            </ul>
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="bg-yellow-500 text-white py-2 px-6 rounded-lg">
              Add to Cart
            </button>
            <button
              className="bg-orange-500 text-white py-2 px-6 rounded-lg cursor-pointer"
              onClick={AddressPage}
            >
              Buy Now
            </button>
            <button
              onClick={getSellerDetails}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Seller Details
            </button>
          </div>
        </div>
        {sellerDetailsComponent && (
          <div className="w-1/3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <img src={sellerContact} alt="seller png" className="w-50 h-50" />
            <h2 className="text-lg font-semibold">
              Seller, {sellerDetails.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Buy Book from our Seller, {sellerDetails.name}
            </p>
            {Number(dataFetch.stocks) > 20 ? (
              <p className="text-1xl font-semibold text-green-600 mt-2">
                Book in Stock: {dataFetch.stocks}
              </p>
            ) : Number(dataFetch.stocks) > 10 ? (
              <p className="text-1xl font-semibold text-yellow-500 mt-2">
                Book in Stock: {dataFetch.stocks}
              </p>
            ) : (
              <p className="text-1xl font-semibold text-red-600 mt-2">
                Book in Stock: {dataFetch.stocks}
              </p>
            )}

            <button
              onClick={() => Navigate("/Main/ContactSeller")}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
            >
              Contact Seller Directly
            </button>

            <h2 className="mt-6 text-lg font-semibold">Warranty</h2>
            <p className="text-gray-600 dark:text-gray-300">
              1 Year Warranty Available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
