import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Loading from "../Components/Loading";
import BurgerMenu from "../Components/BurgerMenu";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [randomActivity, setRandomActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/classes")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomActivity(data[randomIndex]);
        }

        setActivities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching activity list:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between p-2 my-6">
        <h1 className="text-2xl">Popular Classes</h1>
        <BurgerMenu />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="relative mb-6 flex justify-center">
          <Link to={`/class/${randomActivity ? randomActivity.id : ""}`}>
            <img
              className="w-[335px] h-[404px] object-cover rounded-2xl"
              src={randomActivity ? randomActivity.asset.url : ""}
              alt="Large"
            />
          </Link>
          <h2 className="absolute bottom-0 left-1 right-0 text-base font-bold p-3 bg-yellow-400 w-[225px] h-[85px] rounded-bl-2xl rounded-tr-[48px] text-start flex-wrap">
            {randomActivity ? randomActivity.className : ""}
            <div className="mt-1 flex gap-2">
              {/* Hardcodet for design*/}
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </h2>
        </div>
      )}

      <h2 className="text-xl font-bold m-2">Classes for you</h2>
      <div className="flex overflow-x-auto mt-2 no-scrollbar">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to={`/class/${activity.id}`}
            className="m-2 relative"
          >
            <img
              src={activity.asset.url}
              alt={activity.className}
              className="min-w-[129px] min-h-[144px] rounded-xl object-cover rounded-br-none"
            />
            <p className="absolute bottom-0 left-0 font-bold text-xs bg-yellow-400 w-[129px] h-[48px] p-2 rounded-tr-[30px] rounded-bl-[10px]">
              {activity.className}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
