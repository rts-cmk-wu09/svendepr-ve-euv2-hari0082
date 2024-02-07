// Navigation.jsx
import React from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { useAuth } from "../Context/AuthContext";

const Navigation = ({ onClose }) => {
  const { isLoggedIn, logout } = useAuth();

  const handleLinkClick = () => {
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose(); // Luk navigationen efter logud
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-50 text-center">
      <HiX
        className="text-2xl absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      />
      <ul className="list-none text-2xl font-medium">
        <li className="mb-6">
          <Link to="/home" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li className="mb-6">
          <Link to="/search" onClick={handleLinkClick}>
            Search
          </Link>
        </li>
        <li className="mb-6">
          <Link to="/schedule" onClick={handleLinkClick}>
            My Schedule
          </Link>
        </li>
        <li className="mb-6">
          {isLoggedIn ? (
            <Link to="/home" onClick={handleLogout}>
              Log out
            </Link>
          ) : (
            <Link to="/login" onClick={handleLinkClick}>
              Log in
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
