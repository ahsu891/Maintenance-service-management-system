/** @format */

import React, { useState, useEffect } from "react";

const FadeInComponent = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Set fadeIn to true after a short delay to allow the initial rendering
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 100);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className={`bg-gray-200 p-6 rounded-lg shadow-md ${
          fadeIn ? "opacity-100 transition-opacity duration-500" : "opacity-0"
        }`}>
        <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
        <p>This content will fade in when the component mounts.</p>
      </div>
    </div>
  );
};

export default FadeInComponent;
