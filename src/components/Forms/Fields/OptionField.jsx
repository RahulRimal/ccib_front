import React from "react";
import PropTypes from "prop-types";
import styled, { useTheme } from "styled-components";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { current } from "@reduxjs/toolkit";

const DropdownWrapper = styled.div`
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.s8};
  p {
    padding-bottom: ${({ theme }) => theme.spacing.s8};
    font-size: ${({ theme }) => theme.typography.fontSize.f14};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
    color: ${({ theme }) => theme.palette.primary.main};
  }

  & > span {
    position: absolute;
    top: 110%;
    left: 1%;
    color: ${({ theme }) => theme.palette.common.red};
  }

  & > div {
    margin: ${({ theme }) => theme.spacing.s8} 0;
  }
  .react-select__control {
    height: 52px;
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.palette.border.primary};
    background-color: ${({ theme }) => theme.palette.background.dark};
  }
  .react-select__value-container {
    position: relative;
    height: 100%;
    display: flex;
    top: -1px;
  }
  .react-select__input-container {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    input {
      outline: none;
      position: absolute;
      left: ${({ theme }) => theme.spacing.s8};
    }
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
  error,
  title,
  control,
  defaultValue = { defaultValue: "" },
  placeholder = "Select an option",
}) => {
  const theme = useTheme();

  return (
    <DropdownWrapper>
      <p>{title}</p>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
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
        )}
      />
      {error && <span>{error}</span>}
    </DropdownWrapper>
  );
};

export default OptionField;
