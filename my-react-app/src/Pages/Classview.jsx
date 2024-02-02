import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../Components/Loading";

const ClassView = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userIsRegistered, setUserIsRegistered] = useState(false);

  const userIsLoggedIn = true; // You can replace this with your actual logic

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

    setUserIsRegistered(false); // Reset user registration status
  }, [id]);

  const handleSignUp = () => {
    // Simulate user sign-up or leave logic. Replace this with your actual logic.
    if (userIsRegistered) {
      // User is already registered, implement leave logic.
      console.log("Leave");
    } else {
      // User is not registered, implement sign-up logic.
      console.log("Sign Up");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!activity) {
    return <div>No data available for this class at the moment. Sorry</div>;
  }

  return (
    <div>
      <Link to="/home" className="absolute top-8 left-8">
        <img className="w-8 h-8 border-2" src="src/assets/backbtn.png" alt="" />
      </Link>

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
    </div>
  );
};

export default ClassView;
