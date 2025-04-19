import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MOCK_DATA_NAME from "../mocks/resmenuMock.json";
import { act } from "react-dom/test-utils";
import RestaurantMenu from "../RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../header";
import Cart from "../cart";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA_NAME);
    },
  });
});

it("should load Restaurant Menu Component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );

  const accordionHeader = screen.getByText("ROLLS(15)");

  fireEvent.click(accordionHeader);

  expect(screen.getAllByTestId("foodItems").length).toBe(15);

  expect(screen.getByText("🛒cart-(0 items)")).toBeInTheDocument();

  const addbtns = screen.getAllByRole("button", { name: "ADD +" });

  fireEvent.click(addbtns[0]);

  expect(screen.getByText("🛒cart-(1 items)")).toBeInTheDocument();

  fireEvent.click(addbtns[1]);

  expect(screen.getByText("🛒cart-(2 items)")).toBeInTheDocument();

  expect(screen.getAllByTestId("foodItems").length).toBe(17);

  fireEvent.click(screen.getByRole("button", { name: "clear cart" }));

  expect(screen.getAllByTestId("foodItems").length).toBe(15);

  expect(
    screen.getByText("Cart is empty.Add items to the cart")
  ).toBeInTheDocument();
});
