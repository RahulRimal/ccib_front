import OptionField from "../../src/components/Forms/Fields/OptionField";
import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {
  useForm,
  FormProvider,
  Control,
  UseFormRegister,
} from "react-hook-form";
import { theme } from "../../src/theme";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={theme.light}>{children}</ThemeProvider>
    </FormProvider>
  );
};

describe("OptionField Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders the component with options", () => {
    render(
      <Wrapper>
        <OptionField
          name="test"
          control={
            useForm().control as unknown as Control<{ [key: string]: any }>
          }
          register={
            useForm().register as unknown as UseFormRegister<{
              [key: string]: any;
            }>
          }
          options={options}
        />
      </Wrapper>
    );

    const selectElement = screen.getByText("Select an option");
    expect(selectElement).toBeInTheDocument();
  });

  it("handles selection change", () => {
    render(
      <Wrapper>
        <OptionField
          name="test"
          control={
            useForm().control as unknown as Control<{ [key: string]: any }>
          }
          register={
            useForm().register as unknown as UseFormRegister<{
              [key: string]: any;
            }>
          }
          options={options}
        />
      </Wrapper>
    );

    const selectElement = screen.getByText("Select an option");
    fireEvent.keyDown(selectElement, { key: "ArrowDown" });
    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("displays an error message", () => {
    render(
      <Wrapper>
        <OptionField
          name="test"
          control={
            useForm().control as unknown as Control<{ [key: string]: any }>
          }
          register={
            useForm().register as unknown as UseFormRegister<{
              [key: string]: any;
            }>
          }
          options={options}
          error="This is an error message"
        />
      </Wrapper>
    );

    const errorMessage = screen.getByText("This is an error message");
    expect(errorMessage).toBeInTheDocument();
  });
});
