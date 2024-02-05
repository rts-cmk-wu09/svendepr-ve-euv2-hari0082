import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import BurgerMenu from "../Components/BurgerMenu";
import Navigation from "../Components/Navigation";

const Schedule = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleNavigation = () => {
    setIsNavigationOpen((prev) => !prev);
  };

  return (
    <div className="m-4">
      <div className="flex items-center justify-between p-2">
        <Link to="/home">
          <HiArrowNarrowLeft className="text-2xl cursor-pointer" />
        </Link>
        <h1 className="text-2xl">My Schedule</h1>
        {isNavigationOpen && <Navigation onClose={handleToggleNavigation} />}
        <BurgerMenu />
      </div>

      {isLoggedIn ? (
        <p>Your schedule content goes here.</p>
      ) : (
        <div className="text-center mt-12">
          <p>You need to log in to see your schedule.</p>
          <Link to="/login">
            <button className="bg-yellow-300 px-4 py-2 w-full rounded-full mt-3">
              Log in
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Schedule;
