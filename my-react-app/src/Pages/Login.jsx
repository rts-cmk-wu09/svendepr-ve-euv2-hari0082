import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError(""); // Reset any previous errors

      // Get token
      const tokenResponse = await fetch("http://localhost:4000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const tokenData = await tokenResponse.json();
      const authToken = tokenData.token;

      // Use token to fetch user data
      const userResponse = await fetch("http://localhost:4000/api/v1/users", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const userData = await userResponse.json();

      // Handle user data as needed
      console.log("User Data:", userData);

      // Log success in the console
      console.log("Login successful!");

      // Redirect to the schedule page upon successful login
      // You can use the Link component to navigate without useHistory
      // This assumes that you have a Route defined for "/schedule"
      window.location.href = "/schedule";
    } catch (error) {
      console.error("Login failed:", error);
      setError("Something went wrong. Please check your credentials."); // Set error message
    }
  };

  return (
    <div className="flex flex-col items-left relative">
      <Link to="/home" className="absolute top-8 left-8">
        <HiArrowNarrowLeft className="text-2xl cursor-pointer" />
      </Link>
      <h1 className="text-[56px] text-left font-bold mt-20 px-8 text-yellow-300">
        Believe Yourself
      </h1>
      <p className="text-xl font-bold px-8">- Train like a pro</p>

      <div className="p-8 w-full mt-12">
        <h2 className="text-xl font-semibold mb-4">
          Log in with your credentials
        </h2>
        <div className="flex flex-col gap-4">
          <label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-3 w-full bg-gray-100 rounded-full"
              placeholder="Enter your email..."
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 w-full bg-gray-100 rounded-full"
              placeholder="Enter your password..."
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="bg-yellow-300 p-4 rounded-full mt-4 w-full font-bold"
        >
          LOG IN
        </button>

        {error && (
          <p className="text-red-500 mt-2 text-center">
            Something went wrong. Please check your credentials.
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
