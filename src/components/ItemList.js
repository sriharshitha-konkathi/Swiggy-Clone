import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItems } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    // console.log(item);
    dispatch(addItems(item));
  };
  //console.log(items);
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-b-2 border-gray-200 text-left flex justify-between"
        >
          <div className="w-6/12">
            <div className="py-2">
              <span> {item.card.info.name}</span>
              <span>
                -₹
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="p-4 w-3/12">
            <img
              src={CDN_URL + item.card.info.imageId}
              className="w-full rounded-lg"
              alt={item.card.info.name}
            />
            <div className="absolute">
              <button
                className=" px-6 py-2 mx-8 bg-white font-bold text-green-600 rounded shadow-lg"
                onClick={() => handleAddItem(item)}
              >
                ADD +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
