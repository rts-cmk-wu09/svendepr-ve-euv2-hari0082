import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import Loading from "../Components/Loading";
import Navigation from "../Components/Navigation";
import { useAuth } from "../Context/AuthContext";

const ClassView = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const { token, userId } = useAuth();
  const [trainer, setTrainer] = useState(null);

  const userIsLoggedIn = true;

  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/classes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setActivity(data);
        setLoading(false);

        if (data.users && data.users.length > 0) {
          const registeredUserIds = data.users.map((user) => user.id);
          console.log("Registered User Ids:", registeredUserIds);
        } else {
          console.log("No users registered for this class.");
        }

        // Henter trænerens data baseret på trænerId fra aktiviteten
        if (data.trainerId) {
          fetch(`http://localhost:4000/api/v1/trainers/${data.trainerId}`)
            .then((trainerResponse) => trainerResponse.json())
            .then((trainerData) => {
              setTrainer(trainerData);
            })
            .catch((trainerError) => {
              console.error("Error fetching trainer details:", trainerError);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching class details:", error);
        setLoading(false);
      });

    setUserIsRegistered(false);
  }, [id]);

  const handleSignUp = async () => {
    try {
      // Henter token og userId fra api
      // Sæt API-stien baseret på brugerens ID og klassens ID
      const apiUrl = `http://localhost:4000/api/v1/users/${userId}/classes/${id}`;

      let method = "POST"; // Tilmelding

      // Hvis brugeren allerede er tilmeldt, skal man bruge DELETE-metoden for at afmelde
      if (userIsRegistered) {
        method = "DELETE";
      }

      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`${method} request failed:`, response.statusText);
        return;
      }

      setUserIsRegistered((prev) => !prev);

      console.log(`${method} request successful!`);
    } catch (error) {
      console.error("Error handling sign up:", error);
    }
  };

  const handleToggleNavigation = () => {
    setIsNavigationOpen((prev) => !prev);
  };

  if (loading) {
    return <Loading />;
  }

  if (!activity) {
    return <div>Sorry... No data available for this class at the moment.</div>;
  }

  return (
    <div>
      <Link to="/home" className="absolute top-8 left-8">
        <FaArrowLeft className="text-white text-2xl" />
      </Link>

      <button
        className="absolute top-8 right-8 text-white"
        onClick={handleToggleNavigation}
      >
        <HiMenuAlt3 className="text-3xl" />
      </button>

      <img
        className="w-screen h-[432px] object-cover"
        src={activity.asset.url}
        alt={activity.className}
      />
      <h2 className="absolute top-[17rem] left-4 text-4xl text-yellow-400 font-bold">
        {activity.className}
      </h2>
      <div className="mt-1 flex gap-2 items-center text-yellow-400 absolute top-[22.5rem] left-5">
        {/* Hardcodet for design*/}
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar /> 5/5
      </div>
      <button className="absolute top-[22rem] right-8 border-2 border-yellow-400 w-[109px] h-[50px] rounded-full text-yellow-400">
        RATE
      </button>
      <div className="p-4">
        <p className="mb-4">
          {activity.classDay} - {activity.classTime}
        </p>
        <p>{activity.classDescription}</p>
        <p className="font-semibold text-xl mt-6">Trainer</p>
        {trainer ? (
          <div className="flex items-center gap-4 mt-4">
            <img
              className="mt-2 w-[88px] h-[88px] rounded-2xl object-cover"
              src={trainer.asset.url}
              alt={trainer.trainerName}
            />
            <p className="text-base font-semibold mt-2">
              {trainer.trainerName}
            </p>
          </div>
        ) : (
          <p>No trainer info</p>
        )}
      </div>

      {userIsLoggedIn && (
        <div className="flex justify-center items-baseline">
          <button
            className=" bg-yellow-400 w-[334px] h-[50px] rounded-full absolute mt-12"
            onClick={handleSignUp}
          >
            {userIsRegistered ? "Leave" : "Sign Up"}
          </button>
        </div>
      )}

      {isNavigationOpen && <Navigation onClose={handleToggleNavigation} />}
    </div>
  );
};

export default ClassView;
