import RestaurantCard from "./RestaurantCard.jsx";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.jsx";
import { Link } from "react-router-dom";

const Body = () => {
  const [filteredResList, setFilteredResList] = useState([]);
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("/api/swiggy?lat=28.469189&lng=77.1313681"  );

      const json = await data.json();
      const cards = json?.data?.cards || [];

      const restaurantCard = cards.find(
        (c) =>
          c?.card?.card?.gridElements?.infoWithStyle?.restaurants !== undefined
      );

      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      setListofRestaurants(restaurants);
      setFilteredResList(restaurants);
    } catch (err) {
      console.error("FRONTEND FETCH ERROR:", err);
    }
  };

  if (listofRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-6">
      {/* Search Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Restaurants Near You 🍽️
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />

          <button
            onClick={() => {
              const filteredList = listofRestaurants.filter((restaurant) =>
                restaurant.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              setFilteredResList(filteredList);
            }}
            className="rounded-lg bg-orange-500 px-5 py-2 font-medium text-white hover:bg-orange-600 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Restaurant Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredResList.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
            className="hover:scale-[1.02] transition-transform"
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Body;
