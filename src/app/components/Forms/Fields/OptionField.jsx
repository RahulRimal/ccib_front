import React from "react";
import PropTypes from "prop-types";
import styled, { useTheme } from "styled-components";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { current } from "@reduxjs/toolkit";
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
  .react-select__control {
    height: ${({ theme }) => theme.sizing.s52};
    padding: 0 ${({ theme }) => theme.spacing.s8};
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.palette.border.primary};
    background-color: ${({ theme }) => theme.palette.background.dark};

    &--menu-is-open {
      border: 3px solid ${({ theme }) => theme.palette.primary.main};
      &:hover {
        border: 3px solid ${({ theme }) => theme.palette.primary.main};
      }
    }
  }
  .react-select__value-container {
    position: relative;
    height: 100%;
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

const customStyles = {
  cursor: "pointer",
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected && "black",
  }),
};

const OptionField = ({
  options = [],
  name,
  required = false,
  error,
  title,
  control,
  defaultValue = { defaultValue: "" },
  placeholder = "Select an option",
}) => {
  const theme = useTheme();

  return (
    <DropdownWrapper>
      <InputTitle title={title} required={required} />
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
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
                field.onChange(selectedOption ? selectedOption.value : "");
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
