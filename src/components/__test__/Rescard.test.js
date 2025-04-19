//it or test are same

import Rescard from "../Rescard";
import MOCK_DATA from "../mocks/rescardMock.json";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { withPromotedLabel } from "../Rescard";
import Body from "../Body";

it(" should render Rescard component  with props Data", () => {
  render(<Rescard resData={MOCK_DATA} />);

  const name = screen.getByText("Leon's - Burgers & Wings (Leon Grill)");

  expect(name).toBeInTheDocument();
});

const RescardPromoted = withPromotedLabel(Rescard);

it(" should render Rescard component  with Promoted Label", () => {
  render(<RescardPromoted resData={MOCK_DATA} />);

  const promotedLabel = screen.getByText("Promoted");

  expect(promotedLabel).toBeInTheDocument();
});
