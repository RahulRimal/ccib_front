import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../src/theme";
import IconButton from "../../src/components/IconButton";
import React from "react";

describe("IconButton component", () => {
  test("renders with icon", () => {
    render(
      <ThemeProvider theme={theme.light}>
        <IconButton type={""} children="👌" />
      </ThemeProvider>
    );
    expect(screen.getByText("👌")).toBeInTheDocument();
  });
});
