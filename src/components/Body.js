import { useState, useEffect, useContext } from "react";
import Rescard, { withPromotedLabel } from "./Rescard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";

const Body = () => {
  const { loggedInUser, setUserName } = useContext(UserContext);
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");
  console.log(listOfRestaurants);

  const RescardPromoted = withPromotedLabel(Rescard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    // console.log("@@@@@@ 17", json);
    const restaurantDataObject = json?.data?.cards?.find(
      (card) =>
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants !== undefined
    );
    // const restaurantDataObject = json?.data?.cards?.[4];
    console.log("@@@@@@ 22", restaurantDataObject);
    const restaurantList =
      restaurantDataObject?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    setListOfRestaurant(restaurantList);
    setFilteredRestaurant(restaurantList);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>Look's like your offline!! Please check your internet connection</h1>
    );

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter flex  items-center py-4 gap-6">
        <div className="search flex items-center gap-2 p-4 m-4">
          <input
            type="text"
            className="search-box  p-3   border-2"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn border-2 px-4 py-3 rounded text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn  border-2 px-4 py-3 rounded text-white bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.2
            );
            setListOfRestaurant(filteredList);
            console.log("cliked");
          }}
        >
          TOP RATED RESTATURANTS
        </button>
        <div className=" flex items-center gap-2 px-4 py-2  ">
          <label className="font-semibold">UserName : </label>
          <input
            type="text"
            className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={loggedInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="res-container flex flex-wrap  ">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <RescardPromoted resData={restaurant} />
            ) : (
              <Rescard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
