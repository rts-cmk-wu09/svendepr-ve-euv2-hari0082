import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");

      // Kontroller om brugernavn og adgangskode er udfyldt
      if (!username || !password) {
        setError("Please fill in both username and password.");
        return;
      }

      const { token, userId } = await login(username, password);

      console.log("Token received in Login component:", token);
      console.log("UserId received in Login component:", userId);

      setIsLoggedIn(true);

      navigate("/schedule"); // Bruger useNavigate til at navigere til "/schedule" /* Men det virker ikke lige nu? */
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex flex-col items-left relative">
      <Link to="/home" className="absolute top-8 left-8">
        <HiArrowNarrowLeft className="text-2xl cursor-pointer" />
      </Link>
      <h1 className="text-[56px] text-left font-bold mt-20 px-8 text-yellow-400">
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
          className="bg-yellow-400 p-4 rounded-full mt-4 w-full font-bold"
        >
          LOG IN
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
