import "regenerator-runtime/runtime";
import React from "react";
import InputFields from "./InputFields";
import { render, screen } from "@testing-library/react";

describe("render test", () => {
  beforeEach(() => render(<InputFields />));

  test("should render three text fields and their corresponding labels", () => {
    expect(screen.queryAllByRole("textbox").length).toEqual(3);
  });

  test("should render search by post content input field", () => {
    screen.getByLabelText("Filter by Post Content:");
  });

  test("should render search by hashtag input field", () => {
    screen.getByLabelText("Filter by Hashtag:");
  });

  test("should render search by username input field", () => {
    screen.getByLabelText("Filter by Username:");
  });
});
