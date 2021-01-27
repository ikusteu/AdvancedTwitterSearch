import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("If everthing is fine", () => {
  test("should render input fields and feed sections", async () => {
    render(<App />);

    const inputFieldsElement = document.getElementById("input-fields");
    const feedElement = document.getElementById("feed");

    expect(inputFieldsElement).toBeInTheDocument();
    expect(feedElement).toBeInTheDocument();
  });
});
