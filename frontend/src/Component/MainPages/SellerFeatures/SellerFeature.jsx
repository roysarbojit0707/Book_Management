import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { User } from "../../index";

const SellerProfile = () => {
  const [sellerName, setSellerName] = useState(
    sessionStorage.getItem("userNameForSeller")
  );

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    stocks: "",
    author: "",
  });

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const getBooks = async () => {
    try {
      const getAllBooksResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/books/getAllBooks`
      );
      const listData = await getAllBooksResponse.json();
      setBooks(listData);
      console.log(listData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBook = async () => {
    if (newBook.title && newBook.price && newBook.stocks && newBook.author) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/books/addBooks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        }
      );
      const data = await response.json();
      if (data.isAdded) {
        setNewBook({
          title: "",
          price: "",
          stocks: "",
          author: "",
        });
        alert("Book is added");
      } else {
        alert("Book not added");
      }
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
      setBooks((prev) => prev.filter((book) => book.id !== id));
      alert("Book deleted successfully");
    } else {
      alert("Book not deleted");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
      <div className="p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center bg-white dark:bg-gray-900 dark:text-white transition-all transform hover:scale-105 hover:shadow-2xl">
        <img
          src={User}
          alt="Seller Profile"
          className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-500 shadow-md dark:border-gray-400"
        />
        <h2 className="text-3xl font-bold mt-4">Hey, {sellerName}</h2>
        <p className="mt-2 text-lg">Book Seller | Trusted Partner</p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Your Books</h3>
          <br />
          <button
            onClick={getBooks}
            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg font-semibold h-10 w-50 shadow-lg cursor-pointer"
          >
            Show all Books
          </button>
          <ul className="mt-4 space-y-3">
            {books.map((book) => (
              <li
                key={book.id}
                className="flex justify-between items-center p-3 rounded-lg shadow-md border dark:border-gray-700 dark:bg-gray-800"
              >
                <span className="text-lg">
                  {book.title} -{" "}
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {book.price}/-
                  </span>{" "}
                  by {book.author} | In Stock: {book.stocks}
                </span>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 text-xl"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Add New Book</h3>
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            name="title"
            onChange={handleChange}
            className="w-full p-3 border placeholder-gray-600 dark:placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            name="author"
            onChange={handleChange}
            className="w-full p-3 border placeholder-gray-600 dark:placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            placeholder="Price"
            value={newBook.price}
            name="price"
            onChange={handleChange}
            className="w-full p-3 border placeholder-gray-600 dark:placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            placeholder="Books in Stock"
            value={newBook.stocks}
            name="stocks"
            onChange={handleChange}
            className="w-full p-3 border placeholder-gray-600 dark:placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleAddBook}
            className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800 flex items-center gap-2 mx-auto text-lg font-semibold transition-all duration-300 cursor-pointer"
          >
            <FaPlus /> Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
