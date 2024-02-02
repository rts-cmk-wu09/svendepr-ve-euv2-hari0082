// Navigation.jsx
import React from "react";
import { HiX } from "react-icons/hi";

const Navigation = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-50">
      <HiX
        className="text-2xl absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      />
      <ul className="list-none text-2xl font-medium">
        <li className="mb-6">Home</li>
        <li className="mb-6">Search</li>
        <li className="mb-6">My Schedule</li>
        <li className="mb-6">
          <button>Log out</button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
