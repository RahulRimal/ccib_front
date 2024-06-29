import { it, expect, describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../src/theme";
import Button from "../../src/components/Button";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("Button component", () => {
  it("renders button with text", () => {
    render(
      <ThemeProvider theme={theme.light}>
        <Button text="Click Me" />
      </ThemeProvider>
    );
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("renders button with icon", () => {
    render(
      <ThemeProvider theme={theme.light}>
        <Button text="Click Me" icon="👍" />
      </ThemeProvider>
    );
    expect(screen.getByText("👍")).toBeInTheDocument();
  });

  it("not renders button without text", () => {
    render(
      <ThemeProvider theme={theme.light}>
        <Button />
      </ThemeProvider>
    );
    expect(screen.queryByRole("span")).not.toBeInTheDocument();
  });
});
