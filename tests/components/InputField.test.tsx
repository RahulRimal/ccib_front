import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import { theme } from "../../src/theme";
import InputField from "../../src/components/Forms/Fields/InputField";

const Wrapper = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={theme.light}>{children}</ThemeProvider>
    </FormProvider>
  );
};

describe("InputField Component", () => {
  it("renders the component", () => {
    render(
      <Wrapper>
        <InputField
          name="testInput"
          type="text"
          placeholder="Enter text"
          title="Test Input"
          label="Test Input"
          register={() => {}}
          defaultValue={""}
        />
      </Wrapper>
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  it("displays the input value correctly", () => {
    render(
      <Wrapper>
        <InputField
          name="testInput"
          type="text"
          placeholder="Enter text"
          title="Test Input"
          label="Test Input"
          defaultValue="Default Value"
          register={() => {}}
        />
      </Wrapper>
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toHaveValue("Default Value");
  });

  it("handles input change", () => {
    render(
      <Wrapper>
        <InputField
          name="testInput"
          type="text"
          placeholder="Enter text"
          title="Test Input"
          label="Test Input"
          register={() => {}}
        />
      </Wrapper>
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(inputElement).toHaveValue("New Value");
  });

  it("displays an error message", () => {
    render(
      <Wrapper>
        <InputField
          name="testInput"
          type="text"
          placeholder="Enter text"
          title="Test Input"
          label="Test Input"
          error="This is an error message"
          register={() => {}}
        />
      </Wrapper>
    );

    const errorMessage = screen.getByText("This is an error message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not display an error message", () => {
    render(
      <Wrapper>
        <InputField
          name="testInput"
          type="text"
          placeholder="Enter text"
          title="Test Input"
          label="Test Input"
          register={() => {}}
        />
      </Wrapper>
    );

    const errorMessage = screen.queryByText("This is an error message");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("displays the label correctly", () => {
    render(
      <Wrapper>
        <InputField
          name="testInput"
          type="text"
          placeholder="Enter text"
          title="Test Input"
          label="Test Input"
          register={() => {}}
        />
      </Wrapper>
    );

    const labelElement = screen.getByText("Test Input");
    expect(labelElement).toBeInTheDocument();
  });

  it("displays the title correctly", () => {
    render(
      <Wrapper>
        <InputField
          name="testInput"
          type="text"
          placeholder="Enter text"
          title="Test Input"
          label="Test Input"
          register={() => {}}
        />
      </Wrapper>
    );

    const titleElement = screen.getByText("Test Input");
    expect(titleElement).toBeInTheDocument();
  });
});
