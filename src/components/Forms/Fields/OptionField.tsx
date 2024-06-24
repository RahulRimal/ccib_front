import React from "react";
import styled, { useTheme } from "styled-components";
import Select, { SingleValue, StylesConfig } from "react-select";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
  UseFormRegister,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import InputTitle from "./InputTitle";

const DropdownWrapper = styled.div`
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.s8};

  & > div {
    margin: ${({ theme }) => theme.spacing.s8} 0;
    position: relative;
  }
  & > span {
    position: absolute;
    left: 1%;
  }
  .react-select__menu {
    z-index: 99;
  }
  .react-select__control {
    height: ${({ theme }) => theme.sizing.s52};
    border-radius: ${({ theme }) => theme.borderRadius.input};
    background-color: ${({ theme }) => theme.palette.background.dark};
    border: 2px solid ${({ theme }) => theme.palette.border.secondary};
  }
  .react-select__control--is-focused {
    border: 2px solid ${({ theme }) => theme.palette.border.focused};

    &:hover {
      border-color: ${({ theme }) => theme.palette.border.focused};
    }
  }

  .react-select__input-container {
    height: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    position: absolute;
  }
`;

const customStyles: StylesConfig<{ value: string; label: string }> = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "black" : provided.color,
    cursor: "pointer",
  }),
};

type Option = {
  value: string;
  label: string;
};

type OptionFieldProps = {
  name: UseControllerProps<any>["name"];
  required?: boolean;
  error?: string;
  title?: string;
  control: Control<{ [key: string]: any[] }>;
  register: UseFormRegister<any>;
  options?: Option[];
  defaultValue?: any | null;
  placeholder?: string;
};

const OptionField: React.FC<OptionFieldProps> = ({
  options = [],
  name,
  required = false,
  error,
  title,
  control,
  register,
  defaultValue = null,
  placeholder = "Select an option",
}) => {
  const theme = useTheme();

  return (
    <DropdownWrapper>
      <InputTitle title={title} required={required} />
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue?.value || ""}
        render={({ field }: { field: any }) => (
          <>
            <Select
              {...field}
              className="react-select-container"
              classNamePrefix="react-select"
              options={options}
              placeholder={placeholder}
              isClearable
              styles={customStyles}
              theme={(themes) => ({
                ...themes,
                borderRadius: theme.borderRadius.input,
                colors: {
                  ...themes.colors,
                  primary: theme.palette.background.dark,
                },
              })}
              onChange={(selectedOption) => {
                field.onChange(
                  (selectedOption as SingleValue<Option>)?.value || ""
                );
              }}
              value={options.find((option) => option.value === field.value)}
            />
            {error && <ErrorMessage error={error} />}
          </>
        )}
      />
    </DropdownWrapper>
  );
};

export default OptionField;
