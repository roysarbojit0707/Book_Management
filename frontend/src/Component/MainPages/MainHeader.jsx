import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Library,
  User,
  Profile,
  Setting,
  Help,
  Logout,
  Search,
} from "../index";
import ThemeBtn from "./ThemeBtn";
import "./Chatbot.css";

function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleChat = () => setChatOpen(!chatOpen);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoginSeller = sessionStorage.getItem("isValidSeller") === "true";
    const isLoginUser = sessionStorage.getItem("isLogin") === "true";
    if (!isLoginSeller && !isLoginUser) {
      console.log("No user is logged in. Redirecting to userLogin...");
      navigate("/userLogin", { replace: true });
      return;
    }
    if (isLoginSeller) {
      console.log("Seller is logged in. Redirecting to MainHome...");
      navigate("/Main/MainHome", { replace: true });
      return;
    }
    if (isLoginUser) {
      console.log("User is logged in. Allowing access.");
      navigate("/Main/MainHome", { replace: true });
    }
  }, []);
  const navigateToLogout = useNavigate();
  const LogoutUser = () => {
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("isValidSeller");
    navigateToLogout("/", { replace: true });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input };
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: input }), // Ensure it's JSON
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON
      console.log("API Response:", data); // Debugging log
      console.log(typeof data);

      let botMessage = "No response found.";

      if (
        data?.candidates?.length > 0 &&
        data.candidates[0]?.content?.parts?.length > 0
      ) {
        botMessage = data.candidates[0].content.parts[0].text; // Correct extraction
      }

      console.log("Extracted bot message:", botMessage);
      setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response", sender: "bot" },
      ]);
    }
  };

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchSuggestions = useCallback(async () => {
    if (query.length === 0) {
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
      setShowDropdown(true); // Show dropdown only when data is received
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  const ProductFound = (value) => {
    setQuery("");
    setShowDropdown(false);
    setLoading(false);
    setSuggestions([]);
    sessionStorage.setItem("theQueryBook", value);
    navigate("/Main/Product");
  };

  return (
    <header className="shadow sticky z-50 top-0">
      {/* <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        Navbar */}
      <nav className="flex justify-between items-center p-5 bg-gray-900 text-white">
        <img src={Library} alt="Logo" className="w-24" />
        <ul className="hidden md:flex space-x-6">
          <li>
            <NavLink
              to={"/Main/MainHome"}
              className={({ isActive }) =>
                `hover:text-orange-300 ${
                  isActive
                    ? "text-orange-300 hover:text-orange-400"
                    : "text-white"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={
                sessionStorage.getItem("isValidSeller") === "true"
                  ? "/Main/SellerFeature"
                  : "/Main/LibrarySection"
              }
              className={({ isActive }) =>
                `hover:text-orange-300 ${
                  isActive
                    ? "text-orange-300 hover:text-orange-400"
                    : "text-white"
                }`
              }
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/Main/about"}
              className={({ isActive }) =>
                `hover:text-orange-300 ${
                  isActive
                    ? "text-orange-300 hover:text-orange-400"
                    : "text-white"
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={
                (sessionStorage.getItem("isValidSeller") ||
                  sessionStorage.getItem("isLogin")) === "true"
                  ? "/Main/Contact"
                  : "/Main"
              }
              className={({ isActive }) =>
                `hover:text-orange-300 ${
                  isActive
                    ? "text-orange-300 hover:text-orange-400"
                    : "text-white"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="relative">
          <div className="bg-white/20 flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-lg transition focus-within:border-blue-500">
            <img
              src={Search}
              className="text-gray-500 mr-2 w-5 h-5"
              alt="Search"
            />
            <input
              type="text"
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          {showDropdown && (
            <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-50">
              {loading && (
                <li className="px-4 py-2 text-gray-500">Loading...</li>
              )}
              {suggestions.length > 0 ? (
                suggestions.map((value, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => ProductFound(value)}
                  >
                    {value}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}
        </div>
        <ThemeBtn />
        <button
          onClick={toggleChat}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Chat with Bot
        </button>

        {/* Chat Window */}
        {chatOpen && (
          <div className="fixed bottom-16 right-10 bg-white shadow-lg rounded-lg p-4 border dark:bg-gray-800 dark:text-white resizable">
            <div className="flex justify-between items-center border-b pb-2 dark:border-gray-600">
              <h3 className="text-lg text-black dark:text-white font-semibold">
                Chatbot
              </h3>
              <button onClick={toggleChat} className="text-red-500 font-bold">
                X
              </button>
            </div>
            <div className="h-48 overflow-y-auto border-b mt-2 p-2 dark:border-gray-600">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-right dark:bg-blue-700"
                      : "bg-gray-600 dark:bg-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex mt-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border text-black dark:text-white rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* {searhbox} */}
        <div className="relative">
          <img
            src={User}
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleMenu}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
              <div className="p-4 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600">
                <img
                  src={User}
                  alt="User"
                  className="w-12 h-12 rounded-full dark:brightness-90"
                />
                <h3>
                  <Link to="/Profile/Me" className="hover:underline">
                    Me
                  </Link>
                </h3>
              </div>
              <div className="p-2">
                <Link
                  to={"/Main/Setting/EditSection"}
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={Profile}
                    alt="Edit"
                    className="w-6 h-6 mr-2 dark:brightness-90"
                  />{" "}
                  Edit Profile
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={Setting}
                    alt="Settings"
                    className="w-6 h-6 mr-2 dark:brightness-90"
                  />
                  Settings & Privacy
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={Help}
                    alt="Help"
                    className="w-6 h-6 mr-2 dark:brightness-90"
                  />{" "}
                  Help & Support
                </Link>
                <Link
                  onClick={LogoutUser}
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={Logout}
                    alt="Logout"
                    className="w-6 h-6 mr-2 dark:brightness-90"
                  />{" "}
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;
