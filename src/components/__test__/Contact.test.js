import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

test("should load contact us page", () => {
  render(<Contact />);

  const button = screen.getByText("Submit");

  expect(button).toBeInTheDocument();
});
