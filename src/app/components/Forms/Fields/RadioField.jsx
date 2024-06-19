import React from "react";
import PropTypes from "prop-types";
import styled, { useTheme } from "styled-components";
import { Controller } from "react-hook-form";
import InputTitle from "./InputTitle";
import ErrorMessage from "./ErrorMessage";

const FormGroup = styled.div`
  position: relative;

  & > div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.s4};
    margin: ${({ theme }) => theme.spacing.s8} 0;
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.background.default};
  }

  & > span {
    position: absolute;
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
      <InputTitle title={title} required={required} />
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
      {error && <ErrorMessage error={error} />}
    </FormGroup>
  );
};

export default RadioField;
