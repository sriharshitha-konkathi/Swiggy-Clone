import { useState } from "react";
import ItemList from "./ItemList";

const ResCategory = ({ data, showItems, setShowIndex }) => {
  // console.log("data", data);
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div>
      {/*header*/}
      <div className="w-6/12 mx-auto my-4 p-4 bg-gray-50 shadow-lg ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title}({data.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>
        {/* Body*/}
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default ResCategory;
