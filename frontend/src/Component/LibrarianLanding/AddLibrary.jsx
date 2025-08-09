import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { User } from "../index";

const AddLibrary = () => {
  const [librarianUsername, setLibrarianUsername] = useState(
    sessionStorage.getItem("LibrarianUserName")
  );

  const [library, setLibrary] = useState([]);
  const [newLibrary, setNewLibrary] = useState({
    name: "",
    libraryMailId: "",
    latitude: "",
    longitude: "",
    websiteLink: "",
    openingTime: "",
    closingTime: "",
    openDays: "",
    ph: "",
    username: "",
  });

  const handleChange = (e) => {
    setNewLibrary({ ...newLibrary, [e.target.name]: e.target.value });
  };

  const getLibrary = async () => {
    try {
      const getAllBooksResponse = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/library/getLirary?username=${librarianUsername}`
      );
      const listData = await getAllBooksResponse.json();
      setLibrary(listData);
      console.log(listData);
    } catch (error) {
      console.log(error);
    }
  };

  const handelAddLibrary = async () => {
    try {
      console.log(newLibrary);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/library/addLibrary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLibrary),
        }
      );
      const data = await response.json();
      if (data.isAdded) {
        setNewLibrary({
          name: "",
          libraryMailId: "",
          latitude: "",
          longitude: "",
          websiteLink: "",
          openingTime: "",
          closingTime: "",
          openDays: "",
          ph: "",
          username: "",
        });
        alert("Book is added");
      } else {
        alert("Book not added");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBook = async (id) => {
    const deleteResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/books/deleteBook`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    const deleteData = await deleteResponse.json();
    console.log(deleteData);

    if (deleteData.isDeleted) {
      setLibrary((prev) => prev.filter((book) => book.id !== id));
      alert("Book deleted successfully");
    } else {
      alert("Book not deleted");
    }
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const toggleDay = (day) => {
    setNewLibrary((prev) => {
      const updatedDays = prev.openDays.includes(day)
        ? prev.openDays
            .split(", ")
            .filter((d) => d !== day)
            .join(", ")
        : prev.openDays
        ? prev.openDays + ", " + day
        : day;
      return { ...prev, openDays: updatedDays };
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
      <div className="p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center bg-white dark:bg-gray-900 dark:text-white transition-all transform hover:scale-105 hover:shadow-2xl">
        <img
          src={User}
          alt="Seller Profile"
          className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-500 shadow-md dark:border-gray-400"
        />
        <h2 className="text-3xl font-bold mt-4">Hey, {librarianUsername}</h2>
        <p className="mt-2 text-lg">Librarian | Trusted Partner</p>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Your Librays</h3>
          <br />
          <button
            onClick={getLibrary}
            className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-semibold h-10 w-50 shadow-lg cursor-pointer"
          >
            Show all Librarys
          </button>
          <ul className="mt-4 space-y-3">
            {library.map((lib) => (
              <li
                key={lib.id}
                className="flex flex-col p-3 rounded-lg shadow-md border space-y-1"
              >
                <span className="text-lg font-bold">{lib.name}</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  📧 {lib.libraryMailId} | 📍 {lib.latitude}, {lib.longitude}
                </span>
                <span className="text-sm">
                  🌐{" "}
                  <a href={lib.websiteLink} className="text-blue-500 underline">
                    {lib.websiteLink}
                  </a>
                </span>
                <span className="text-sm">
                  🕒 {lib.openingTime} - {lib.closingTime}
                </span>
                <span className="text-sm">📅 Open Days: {lib.openDays}</span>
                <span className="text-sm">📞 {lib.ph}</span>
                <span className="text-sm font-semibold">👤 {lib.username}</span>
                <button
                  onClick={() => handleDeleteBook(lib.id)}
                  className="mt-2 text-red-500 hover:text-red-700 text-xl self-end"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 grid text-black dark:text-gray-400 gap-4">
          <input
            type="text"
            placeholder="Library Name"
            onChange={handleChange}
            name="name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Library Mail ID"
            name="libraryMailId"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Latitude"
            name="latitude"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Longitude"
            name="longitude"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="url"
            placeholder="Website Link"
            name="websiteLink"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="time"
            placeholder="Opening Time"
            name="openingTime"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="time"
            placeholder="Closing Time"
            name="closingTime"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <div className="mt-2 bg-white dark:bg-gray-700 border p-2 rounded-lg shadow-lg">
            {daysOfWeek.map((day) => (
              <label
                key={day}
                className="flex items-center space-x-2 p-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={day}
                  checked={newLibrary.openDays.includes(day)}
                  onChange={() => toggleDay(day)}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
          <input
            type="tel"
            placeholder="Phone Number"
            name="ph"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <button
            onClick={handelAddLibrary}
            className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800 flex items-center gap-2 mx-auto text-lg font-semibold transition-all duration-300 cursor-pointer"
          >
            <FaPlus /> Add Libray
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLibrary;
