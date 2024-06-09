import React from "react";
import PropTypes from "prop-types";
import styled, { useTheme } from "styled-components";
import { Controller } from "react-hook-form";

const FormGroup = styled.div`
  position: relative;
  p {
    padding-bottom: ${({ theme }) => theme.spacing.s8};
    font-size: ${({ theme }) => theme.typography.fontSize.f14};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
    color: ${({ theme }) => theme.palette.primary.main};
  }
  & > div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.s4};
    margin: ${({ theme }) => theme.spacing.s8} 0;
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.background.default};
  }

  span {
    color: ${({ theme }) => theme.palette.error.main};
    position: absolute;
    top: 110%;
    left: 1%;
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s8};
`;

const RadioInput = styled.input`
  cursor: pointer;
  height: ${({ theme }) => theme.sizing.s24};
  width: ${({ theme }) => theme.sizing.s24};
`;

const RadioField = ({
  control,
  name,
  required = false,
  title,
  error,
  options,
  defaultChecked,
}) => {
  const theme = useTheme();

  return (
    <FormGroup>
      <p>{title}</p>
      <div
        style={{
          display: "flex",
          gap: theme.spacing.s16,
        }}
      >
        {options.map((option, index) => (
          <RadioWrapper key={index}>
            <Controller
              name={name}
              control={control}
              defaultValue={defaultChecked || ""}
              render={({ field }) => (
                <RadioInput {...field} type="radio" value={option.value} />
              )}
            />
            <label htmlFor={`${name}[${index}]`}>{option.label}</label>
          </RadioWrapper>
        ))}
      </div>
      {error && <span>{error}</span>}
    </FormGroup>
  );
};

export default RadioField;
