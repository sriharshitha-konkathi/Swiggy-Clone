import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/userContext";

const Rescard = (props) => {
  const { resData } = props;
  const { loggedInUser } = useContext(UserContext);

  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    resData?.info;
  const { deliveryTime } = resData.info.sla;

  return (
    <div className="rescard rounded-lg shadow-md p-5 m-5 w-[360px] h-[450px] transition hover:bg-gray-300 bg-gray-200">
      <img
        className=" reslogo  rounded-md w-full h-52 object-cover  "
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold mt-4 text-lg">{name}</h3>
      <p className="text-sm text-gray-600 mb-1">{cuisines.join(",")}</p>
      <p className="text-sm"> ⭐ {avgRating}</p>
      <p className="">{costForTwo}</p>
      <p className="text-sm text-gray-700">{deliveryTime}minutes</p>
      <p className="text-sm text-gray-700"> User : {loggedInUser}</p>
    </div>
  );
};

export const withPromotedLabel = (Rescard) => {
  return (props) => {
    return (
      <div>
        <label> Promoted </label>
        <Rescard {...props} />
      </div>
    );
  };
};

export default Rescard;
