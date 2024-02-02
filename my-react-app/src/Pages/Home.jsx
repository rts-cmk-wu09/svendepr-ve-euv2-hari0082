import React, { useState, useEffect } from "react";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [largeImageUrl, setLargeImageUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/classes/5")
      .then((response) => response.json())
      .then((data) => {
        setLargeImageUrl(data.asset.url);
      })
      .catch((error) => {
        console.error("Error fetching large image:", error);
      });

    fetch("http://localhost:4000/api/v1/classes")
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => {
        console.error("Error fetching activity list:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Popular Classes</h1>
      <img className="w-full max-w-full mb-8" src={largeImageUrl} alt="Large" />

      <div className="">
        {activities.map((activity) => (
          <div key={activity.id} className="flex-shrink-0 w-48">
            <h3 className="text-lg font-semibold m-2">{activity.className}</h3>
            <img
              className="w-full h-32 object-cover"
              src={activity.asset.url}
              alt={activity.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
