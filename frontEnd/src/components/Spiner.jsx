import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa"; // Assuming you have imported FaSpinner from react-icons/fa
import { useNavigation } from "react-router-dom";

const S = () => {
  //   const [isLoading, setIsLoading] = useState(true);
  //   const loading = useNavigation();

  // Simulating loading delay with setTimeout

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default S;
