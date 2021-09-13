import { render } from "@testing-library/react";
import React from "react";
import App from "..App";

it("App renders without crashing", () => {
  render(<App />);
});
