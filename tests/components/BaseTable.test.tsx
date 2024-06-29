import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../src/theme";
import React from "react";
import BaseTable from "../../src/components/Tables/BaseTable";
import "@testing-library/jest-dom/vitest";

describe("DataItems", () => {
  it("Should be no data", () => {
    const { container } = render(
      <ThemeProvider theme={theme.light}>
        <BaseTable rows={[]} columns={[]} noDataMessage={"No data"} />
      </ThemeProvider>
    );

    const noData = screen.getByRole("banner");
    expect(noData).toBeInTheDocument();
  });
});
