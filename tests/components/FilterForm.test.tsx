import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import FilterForm from "../../src/components/FilterForm";
import { theme } from "../../src/theme";
import { AdvanceFilter } from "../../src/models/misc";

describe("FilterForm component", () => {
  const filterFields: AdvanceFilter[] = [
    {
      title: "Enter",
      inputs: [
        {
          label: "Enter",
          name: "enterText",
          type: "text",
          required: false,
          basis: 30,
          options: [],
          defaultValue: "",
          placeholder: "Enter",
        },
        {
          label: "Enter",
          name: "enterSelect",
          type: "select",
          required: false,
          basis: 30,
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ],
          defaultValue: "",
          placeholder: "Enter",
        },
      ],
    },
  ];

  const renderForm = (
    filterFields?: AdvanceFilter[],
    onFilter = () => {},
    onReset = () => {}
  ) => {
    render(
      <ThemeProvider theme={theme.light}>
        <FilterForm
          showFilters={true}
          filterFields={filterFields}
          onFilter={onFilter}
          onReset={onReset}
          validationSchema={{} as any}
        />
      </ThemeProvider>
    );

    return {
      waitForFormToLoad: async () => {
        await screen.findByRole("form");
        return {
          nameInput: () => screen.getByPlaceholderText(/enter/i),
          selectInput: () => screen.getByLabelText("Enter"),
          filterButton: screen.getByRole("button", { name: /filter/i }),
        };
      },
    };
  };

  it("should render filter form fields", async () => {
    const { waitForFormToLoad } = renderForm(filterFields);
    const input = await waitForFormToLoad();

    const user = userEvent.setup();
    await user.type(input.nameInput(), "Hello");

    expect(input.nameInput()).toHaveValue("Hello");
  });
  it.each([
    {
      scenario: "missing",
      errorMessage: /required/i,
    },
    {
      scenario: "longer than 3 characters",
      name: "Ho",
      errorMessage: /required/i,
    },
  ])(
    "should display error message if input is $scenario",
    async ({ name, errorMessage }) => {
      const { waitForFormToLoad } = renderForm();
      const form = await waitForFormToLoad();
      const user = userEvent.setup();
      if (name !== undefined) await user.type(form.nameInput(), name);
      await user.click(form.filterButton);

      const error = screen.getByRole("");
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(/required/i);
    }
  );

  it("should call onFilter", async () => {
    const { waitForFormToLoad } = renderForm(filterFields);
    const form = await waitForFormToLoad();
    const user = userEvent.setup();
    user.click(form.filterButton);

    expect(vi.fn()).toHaveBeenCalled();
  });
});
