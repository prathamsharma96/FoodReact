import RestaurantCard from "./RestaurantCard.jsx";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.jsx";

const Body = () => {
  const [filteredResList, setFilteredResList] = useState([]);
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "http://localhost:5000/api/swiggy?lat=28.469189&lng=77.1313681"
      );

      const json = await data.json();

      console.log("FULL JSON:", json);

      // 🔥 DYNAMICALLY FIND THE CARD THAT HAS restaurants
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
    <div className="body">
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
        >
          Search
        </button>
      </div>

      <div className="res-container">
        {filteredResList.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
