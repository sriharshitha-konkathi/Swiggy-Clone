import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import React from "react";
import MOCK_DATA from "../mocks/reslistdataMock.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Rescard from "../Rescard";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("should search reslist for Burger text input", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const cardsBeforeSearch = screen.getAllByTestId("Rescard");

  expect(cardsBeforeSearch.length).toBe(20);

  const searchbtn = screen.getByRole("button", { name: "Search" });

  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "burger" } });

  fireEvent.click(searchbtn);

  const cardsAfterSearch = screen.getAllByTestId("Rescard");

  expect(cardsAfterSearch.length).toBe(1);
});

it("should filter Top rated Restaurant", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const cardsBeforeFilter = screen.getAllByTestId("Rescard");

  expect(cardsBeforeFilter.length).toBe(20);

  const topRatedbtn = screen.getByRole("button", {
    name: "TOP RATED RESTAURANTS",
  });
  fireEvent.click(topRatedbtn);

  const cardsAfterFilter = screen.getAllByTestId("Rescard");

  expect(cardsAfterFilter.length).toBe(9);
});
