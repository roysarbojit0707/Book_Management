import { useState } from "react";
import LibraryMap from "./LibrarySection";

const LibraryPage = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!showMap ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to the Library Finder
          </h2>
          <p className="mb-6">
            Click the button below to find nearby libraries on the map.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowMap(true)}
          >
            Show Libraries
          </button>
        </div>
      ) : (
        <LibraryMap />
      )}
    </div>
  );
};

export default LibraryPage;
