import React, { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Url_P = "/auth/forgetPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        Url_P,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.message || "Something went wrong");
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen   bg-whiter">
      <div className="bg-white p-8 rounded-sm shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-primary font-bold mb-6 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block   text-graydark mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg  transition duration-300"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-primary">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
