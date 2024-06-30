import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { vi } from "vitest";
import { theme } from "../../src/theme";
import OptionField from "../../src/components/Forms/Fields/OptionField";

describe("OptionField component", () => {
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const renderOptionField = (
    onSubmit: () => void,
    defaultValue?: any,
    error?: string
  ) => {
    const Component = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <OptionField
              name="gender"
              control={methods.control}
              register={methods.register}
              options={options}
              defaultValue={defaultValue}
              error={error}
              title="Gender"
              required={true}
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    return render(
      <ThemeProvider theme={theme.light}>
        <Component />
      </ThemeProvider>
    );
  };

  it("should render the option field", async () => {
    renderOptionField(() => {});

    const inputElement = screen.getByLabelText("Gender");
    expect(inputElement).toBeInTheDocument();
  });

  it("should select an option and submit the form", async () => {
    const handleSubmit = vi.fn();
    renderOptionField(handleSubmit);

    const user = userEvent.setup();
    const selectInput = screen.getByLabelText("Gender");

    await user.click(selectInput);
    const option = await screen.findByText("Male");
    await user.click(option);

    expect(selectInput).toHaveValue("male");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit.mock.calls[0][0]).toEqual({ gender: "male" });
  });

  it("should show an error message", async () => {
    renderOptionField(() => {}, null, "This field is required");

    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
  });
});
