import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import BurgerMenu from "../Components/BurgerMenu";
import Navigation from "../Components/Navigation";
import Loading from "../Components/Loading";

const Search = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [popularClasses, setPopularClasses] = useState([]);
  const [popularTrainers, setPopularTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleNavigation = () => {
    setIsNavigationOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:4000/api/v1/classes")
      .then((response) => response.json())
      .then((data) => setPopularClasses(data))
      .catch((error) => console.error("Error fetching popular classes:", error))
      .finally(() => setIsLoading(false));

    fetch("http://localhost:4000/api/v1/trainers")
      .then((response) => response.json())
      .then((data) => setPopularTrainers(data.slice(0, 3)))
      .catch((error) =>
        console.error("Error fetching popular trainers:", error)
      )
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="m-4">
      <div className="flex items-center justify-between p-2">
        <Link to="/home">
          <HiArrowNarrowLeft className="text-2xl cursor-pointer" />
        </Link>
        <h1 className="text-2xl">Search</h1>
        {isNavigationOpen && <Navigation onClose={handleToggleNavigation} />}
        <BurgerMenu />
      </div>
      <div>
        <input
          type="text"
          className="border border-gray-300 h-[50px] p-3 mt-3 rounded-full w-full"
          placeholder="Search"
        />
      </div>
      {isLoading && <Loading />}
      <h2 className="text-xl font-bold mt-12">Popular Classes</h2>
      <div className="flex overflow-x-auto mt-2">
        {popularClasses.map((classItem) => (
          <Link
            key={classItem.id}
            to={`/class/${classItem.id}`}
            className="m-2 relative"
          >
            <img
              src={classItem.asset.url}
              alt={classItem.className}
              className="min-w-[129px] min-h-[144px] rounded-xl object-cover"
            />
            <p className="absolute bottom-2 left-2 text-white font-bold text-xs">
              {classItem.className}
            </p>
          </Link>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-12">Popular Trainers</h2>
      <div className="flex flex-col mt-2">
        {popularTrainers.map((trainer) => (
          <div key={trainer.id} className="m-2 flex items-center">
            <img
              src={trainer.asset.url}
              alt={trainer.trainerName}
              className="w-[88px] h-[88px] rounded-xl object-cover"
            />
            <p className="ml-2">{trainer.trainerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
