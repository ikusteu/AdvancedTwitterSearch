import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("If everthing is fine", () => {
  test("should render Hello World", async () => {
    render(<App />);
    expect(await screen.findByText(/hello world/i)).toBeInTheDocument();
  });
});
