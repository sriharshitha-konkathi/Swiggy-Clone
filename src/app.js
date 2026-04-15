import React, { StrictMode, lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import Header from "./components/header";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Grocery from "./components/Grocery";
import UserContext from "./utils/userContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

//import "./index.css";

//const Grocery = lazy(() => import("./components/Grocery"));
//const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  //const [userName, setUserName] = useState();
  const [loggedInUser, setUserName] = useState("Harshitha");

  /*useEffect(() => {
    const data = {
      name: "Harshitha",
    };

    setUserName(data.name);
  });*/

  return (
    // <UserContext.Provider value={{ loggedInUser: userName , setUserName }}>  not working as he said

    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
], {
  basename: window.location.hostname.includes("github.io") ? "/Amazon-Clone" : "/",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
