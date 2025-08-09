// import React from "react";

// function SearchingProduct() {
//   return (
//     <div className="relative w-full max-w-lg mx-auto mt-10">
//       <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-lg transition focus-within:border-blue-500">
//         <img src={Search} className="text-gray-500 mr-2 w-5 h-5" alt="Search" />
//         <input
//           type="text"
//           placeholder="Search books..."
//         //   className="w-full bg-transparent focus:outline-none"
//           value={query}
//           onChange={handleChange}
//         />
//         {query && (
//           <button
//             onClick={clearInput}
//             className="text-gray-500 hover:text-red-500"
//           >
//             <img
//               src={Clear}
//               className="text-gray-500 mr-2 w-3 h-3"
//               alt="Clear"
//             />
//           </button>
//         )}
//       </div>

//       {/* Suggestions Dropdown */}
//       {suggestions.length > 0 && (
//         <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-2 shadow-xl max-h-52 overflow-y-auto">
//           {suggestions.map((book, index) => (
//             <li
//               key={index}
//               className="p-3 hover:bg-gray-100 cursor-pointer transition"
//               onClick={() => handleSelect(book)}
//             >
//               {book}
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Loading Indicator */}
//       {loading && <p className="text-gray-500 text-sm mt-2">Loading...</p>}
//     </div>
//   );
// }

// export default SearchingProduct;
