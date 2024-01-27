// import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function App() {
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  useEffect(function () {
    // Function to get current location coordinates and return a promise
    function getCurrentLocation() {
      return new Promise((resolve, reject) => {
        // Check if the Geolocation API is supported
        if ("geolocation" in navigator) {
          // Get the current position
          navigator.geolocation.getCurrentPosition(
            // Success callback
            function (position) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Resolve the promise with the coordinates
              resolve({ latitude, longitude });
            },
            // Error callback
            function (error) {
              // Reject the promise with the error
              reject(error.message);
            }
          );
        } else {
          // Reject the promise if geolocation is not supported
          reject("Geolocation is not supported by your browser");
        }
      });
    }

    // Call the function to get current location and handle the promise
    getCurrentLocation()
      .then((coordinates) => {
        // Log or use the coordinates as needed
        setLat(coordinates.latitude);
        setLog(coordinates.longitude);
        console.log("Latitude:", coordinates.latitude);
        console.log("Longitude:", coordinates.longitude);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error getting location:", error);
      });
  }, []);
  return (
    <div>
      {/* <h1>Google Maps Directions Example</h1> */}

      {/* <DirectionsMap /> */}
      <Link
        to={`https://www.google.com/maps/dir/${lat},${log}/7.5541172,37.8843371/@7.55439,37.8822889,697m/data=!3m2!1e3!4b1!4m2!4m1!3e2?entry=ttu`}
      >
        Go the map
      </Link>
    </div>
  );
}

export default App;
