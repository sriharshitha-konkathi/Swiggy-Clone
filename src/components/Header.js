import { LOGO_URL } from "../utils/constants";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    console.log(btnName);
  }, []);

  return (
    <div className=" header flex justify-between items-center p-4  m-2 border-2 shadow-cyan-100">
      <div className="logo-container">
        <img className="logo w-36" src={LOGO_URL} alt="appLogo" />
      </div>
      <div className="nav-items flex ">
        <ul className="flex gap-10 items-center font-bold text-xl ">
          <li>Online Status : {onlineStatus ? "✅" : "🛑"}</li>
          <li>
            <Link to="/" className="no-underline ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="no-underline ">
              About us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="no-underline ">
              contact Us
            </Link>
          </li>
          <li>
            <Link to="/grocery" className="no-underline ">
              Grocery
            </Link>
          </li>
          <li>
            <Link to="/cart" className="no-underline">
              🛒cart-({cartItems.length} items)
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <button
            className="login  px-6 py-2 m-4  bg-blue-500 text-white rounded hover:bg-blue-600  "
            onClick={() => {
              setBtnName(btnName === "Login" ? "Logout" : "Login");
            }}
          >
            {btnName}
          </button>
          <span className="font-bold text-blue-600">{loggedInUser}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
