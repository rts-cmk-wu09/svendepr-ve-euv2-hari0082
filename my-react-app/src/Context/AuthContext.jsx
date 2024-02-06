import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = async (username, password) => {
    try {
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

      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        setToken(tokenData.token);
        setUserId(tokenData.userId);
        setIsLoggedIn(true);
        console.log("Token parsed in AuthContext:", tokenData.token); // <-- Add this line
        console.log("UserId parsed in AuthContext:", tokenData.userId); // <-- Add this line
      } else {
        console.error("Login failed:", tokenResponse.statusText);
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Something went wrong. Please check your credentials.");
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
