import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ResCategory from "./ResCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  //   const { itemCards } =
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  const groupedCardsObj = resInfo?.cards?.find((card) => card?.groupedCard);
  const cardsObj =
    groupedCardsObj?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
      (c) => c?.card?.card?.itemCards
    );
  const itemCards = cardsObj?.card.card.itemCards;

  //console.log("@@@@@ itemcard", itemCards);

  const categories =
    groupedCardsObj?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  //console.log("cat", categories);

  return (
    <div className="menu text-center">
      <h1 className="font-bold text-2xl my-5">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(",")}- {costForTwoMessage}
      </p>
      {categories.map((category, index) => (
        <ResCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
