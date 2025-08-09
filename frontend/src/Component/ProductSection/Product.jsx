import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Product() {
  const [selectedBooks, setSelectedBooks] = useState(
    () => sessionStorage.getItem("theQueryBook") || ""
  );
  const [dataFetch, setDataFetch] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selectedBooks) fetchData();
  }, [selectedBooks]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/fetchSellers/books?title=${selectedBooks}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setDataFetch(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSuggestions = useCallback(async () => {
    if (!query) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/search/books?query=${query}`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowDropdown(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateToDetails = useNavigate();
  const viewDetails = (id, seller) => {
    console.log(id + " type is " + typeof id);
    sessionStorage.setItem("bookDetails", id);
    console.log(seller);
    sessionStorage.setItem("SellerName", seller);
    navigateToDetails("/Main/ProductDetails");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black dark:bg-gray-900 dark:text-white transition-all duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 dark:from-blue-400 dark:to-purple-500">
            Book Search
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search for a book..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black dark:bg-gray-800 dark:text-white transition-all"
          />
          {showDropdown && (
            <ul className="absolute left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-1 shadow-lg z-50">
              {loading ? (
                <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                  Loading...
                </li>
              ) : suggestions.length > 0 ? (
                suggestions.map((value, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white"
                    onClick={() => {
                      setSelectedBooks(value);
                      sessionStorage.setItem("theQueryBook", value);
                      setShowDropdown(false);
                    }}
                  >
                    {value}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                  No results found
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Book List */}
        <h2 className="mt-6 text-2xl font-semibold text-indigo-600 dark:text-blue-400 text-center">
          Search Results
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {dataFetch.length > 0 ? (
            dataFetch.map((book, index) => (
              <div
                key={index}
                className="flex flex-col border p-5 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 relative overflow-hidden"
              >
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 dark:from-blue-400 dark:to-purple-400">
                  {book.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-300">
                  by {book.author}
                </p>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  {book.price}
                </p>
                <p className="text-yellow-500 dark:text-yellow-400">
                  In Stock: {book.stocks}
                </p>
                <p className="text-xl text-gray-400 dark:text-gray-300">
                  Seller: {book.username}
                </p>
                <button
                  onClick={() => viewDetails(book.id, book.username)}
                  className="mt-2 px-4 py-2 rounded-full transition-all bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <h1 className="text-center font-bold text-red-500 dark:text-red-400">
              No books found.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
