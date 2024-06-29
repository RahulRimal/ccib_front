import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../src/theme";
import FinancePage from "../../src/pages/FinancePage";
import React from "react";

describe("FinancePage component", async () => {
  test("renders finance page", async () => {
    render(
      <ThemeProvider theme={theme.light}>
        <FinancePage />
      </ThemeProvider>
    );
    const data = await screen.findAllByRole("data");
    expect(data.length).toBeGreaterThan(0);
  });
});
