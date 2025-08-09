import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [loading, setLoading] = useState(true);
  const [libraries, setLibraries] = useState([]);
  const defaultCenter = { lat: 23.53862, lng: 87.26929 }; // Default center (Kolkata)

  useEffect(() => {
    const getLibraries = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/library/nearby`
        );
        const data = await response.json();
        setLibraries(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching libraries:", err);
        setLoading(false);
      }
    };

    getLibraries();
  }, []);

  return (
    <div className="map-container" style={{ marginTop: "2px", zIndex: 1 }}>
      {!loading ? (
        <MapContainer
          center={[defaultCenter.lat, defaultCenter.lng]}
          zoom={9}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Render Library Markers */}
          {libraries.length > 0 ? (
            libraries.map((library, index) => (
              <Marker
                key={index}
                position={[library.latitude, library.longitude]}
              >
                <Popup>{library.name}</Popup>
              </Marker>
            ))
          ) : (
            <p>No libraries found.</p>
          )}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapComponent;

// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const MapComponent = () => {
//   const [libraries, setLibraries] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ lat: latitude, lng: longitude });
//         setLoading(false);

//         // Fetch nearby libraries
//         fetch(
//           `http://localhost:8080/library/nearby?lat=${latitude}&lng=${longitude}`
//         )
//           .then((res) => res.json())
//           .then((data) => setLibraries(data))
//           .catch((err) => console.error("Error fetching libraries:", err));
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         setLoading(false);
//       }
//     );
//   }, []);

//   return (
//     <div className="map-container">
//       {!loading ? (
//         <MapContainer
//           center={
//             userLocation
//               ? [userLocation.lat, userLocation.lng]
//               : [22.5726, 88.3639]
//           }
//           zoom={13}
//           style={{ height: "500px", width: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />

//           {/* User Location Marker */}
//           {userLocation && (
//             <Marker position={[userLocation.lat, userLocation.lng]}>
//               <Popup>You are here</Popup>
//             </Marker>
//           )}

//           {/* Library Markers */}
//           {libraries.map((library, index) => (
//             <Marker key={index} position={[library.lat, library.lng]}>
//               <Popup>{library.name}</Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       ) : (
//         <p>Loading map...</p>
//       )}
//     </div>
//   );
// };

// export default MapComponent;
