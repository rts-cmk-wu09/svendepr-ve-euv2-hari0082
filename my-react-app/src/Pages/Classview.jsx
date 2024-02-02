// ClassView.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import Loading from "../Components/Loading";
import Navigation from "../Components/Navigation";

const ClassView = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const userIsLoggedIn = true;

  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/classes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setActivity(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching class details:", error);
        setLoading(false);
      });

    setUserIsRegistered(false);
  }, [id]);

  const handleSignUp = () => {
    if (userIsRegistered) {
      console.log("Leave");
    } else {
      console.log("Sign Up");
    }
  };

  const handleToggleNavigation = () => {
    setIsNavigationOpen((prev) => !prev);
  };

  if (loading) {
    return <Loading />;
  }

  if (!activity) {
    return <div>No data available for this class at the moment. Sorry</div>;
  }

  return (
    <div>
      {/* Back button with FaArrowLeft icon */}
      <Link to="/home" className="absolute top-8 left-8">
        <FaArrowLeft className="text-white text-2xl" />
      </Link>

      <button
        className="absolute top-8 right-8 text-white"
        onClick={handleToggleNavigation}
      >
        <HiMenuAlt3 className="text-2xl" />
      </button>

      <img
        className="w-screen"
        src={activity.asset.url}
        alt={activity.className}
      />
      <h2>{activity.className}</h2>
      <p>Day: {activity.classDay}</p>
      <p>Time: {activity.classTime}</p>
      <p>{activity.classDescription}</p>
      <p>Instructor: {activity.trainer.trainerName}</p>

      {userIsLoggedIn && (
        <button
          className="p-4 bg-yellow-300 w-full rounded-full mt-4"
          onClick={handleSignUp}
        >
          {userIsRegistered ? "Leave" : "Sign Up"}
        </button>
      )}

      {isNavigationOpen && <Navigation onClose={handleToggleNavigation} />}
    </div>
  );
};

export default ClassView;
