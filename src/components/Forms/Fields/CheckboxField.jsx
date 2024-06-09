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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s8};
`;

const CheckboxInput = styled.input`
  cursor: pointer;
  height: ${({ theme }) => theme.sizing.s24};
  width: ${({ theme }) => theme.sizing.s24};
`;

const CheckboxField = ({
  required = false,
  title,
  error,
  options,
  name,
  control,
}) => {
  const theme = useTheme();

  return (
    <FormGroup>
      <p>{title}</p>
      <div>
        {options.map((option, index) => (
          <CheckboxWrapper key={index}>
            <Controller
              name={`${name}.${option.value}`}
              control={control}
              render={({ field }) => (
                <CheckboxInput
                  type="checkbox"
                  checked={field.value || false}
                  required={required}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <label htmlFor={`${name}[${index}]`}>{option.label}</label>
          </CheckboxWrapper>
        ))}
      </div>
      {error && <span>{error}</span>}
    </FormGroup>
  );
};

export default CheckboxField;
