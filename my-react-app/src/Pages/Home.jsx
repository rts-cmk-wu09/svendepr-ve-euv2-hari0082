import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import Loading from "../Components/Loading";
import BurgerMenu from "../Components/BurgerMenu";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [largeImageUrl, setLargeImageUrl] = useState("");
  const [largeImageTitle, setLargeImageTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/classes")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setLargeImageUrl(data[randomIndex].asset.url);
          setLargeImageTitle(data[randomIndex].className);
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
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center gap-24 p-2 mb-6">
        <h1 className="text-2xl">Popular Classes</h1>
        <BurgerMenu />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="relative mb-8">
          <Link to={`/class/${activities.length > 0 ? activities[0].id : ""}`}>
            <img
              className="w-[335px] h-[400px] object-cover rounded-2xl"
              src={largeImageUrl}
              alt="Large"
            />
          </Link>
          <h2 className="absolute bottom-0 left-0 right-0 text-base font-bold p-4 bg-yellow-400 w-[224px] h-[72px] rounded-bl-2xl rounded-tr-[48px] text-left">
            {largeImageTitle}
          </h2>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Classes for you</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to={`/class/${activity.id}`}
            className="flex-shrink-0 w-48 relative"
          >
            <img
              className="w-full h-32 object-cover"
              src={activity.asset.url}
              alt={activity.title}
            />
            <h3 className="absolute bottom-0 left-0 right-0 text-xl font-bold p-2 bg-yellow-400 rounded-tr-full">
              {activity.className}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
