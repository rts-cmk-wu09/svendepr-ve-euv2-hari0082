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

  const userIsLoggedIn = true; // Du kan opdatere dette i henhold til din autentificering

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

    // Simulerer, at brugeren allerede er tilmeldt klassen (du skal opdatere dette i henhold til din logik)
    setUserIsRegistered(false);
  }, [id]);

  const handleSignUp = async () => {
    try {
      // Hent token og userId fra din autentificeringskontekst eller hvor du opbevarer dem
      const { token, userId } = getAuthToken(); // Funktionen, der henter token og userId

      // Sæt API-stien baseret på brugerens ID og klassens ID
      const apiUrl = `http://localhost:4000/api/v1/users/${userId}/classes/${id}`;

      let method = "POST"; // Standard er tilmelding

      // Hvis brugeren allerede er tilmeldt, skal vi bruge DELETE-metoden for at afmelde
      if (userIsRegistered) {
        method = "DELETE";
      }

      // Udfør API-anmodningen
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

      // Opdater brugerens tilmeldingsstatus
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
    return <div>No data available for this class at the moment. Sorry</div>;
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
        <HiMenuAlt3 className="text-2xl" />
      </button>

      <img
        className="w-screen h-[432px] object-cover"
        src={activity.asset.url}
        alt={activity.className}
      />
      <h2 className="absolute top-64 left-4 text-4xl text-yellow-400 font-bold">
        {activity.className}
      </h2>
      <button className="absolute top-80 right-12 border-2 border-yellow-400 w-[109px] h-[50px] rounded-full text-yellow-400 font-semibold">
        RATE
      </button>
      <div className="p-4">
        <p className="font-semibold mb-4">
          {activity.classDay} - {activity.classTime}
        </p>
        <p>{activity.classDescription}</p>
        <p className="font-semibold text-xl mt-4">Trainer</p>
        <div className="border p-4 mt-2 w-[88px] h-[88px]">
          {/* mangler billede af træner, men han er ikke med i objektet. */}
        </div>
        <p className="text-base font-semibold mt-2">
          {activity.trainer.trainerName}
        </p>
      </div>

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
