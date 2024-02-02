import React from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";

const Navigation = ({ onClose }) => {
  const handleLinkClick = () => {
    onClose(); // Close the navigation menu when a link is clicked
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-50">
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
          <button>Log out</button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
