import React from "react";
import styled, { useTheme } from "styled-components";
import ErrorMessage from "./ErrorMessage";
import InputTitle from "./InputTitle";

const FormGroup = styled.div`
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.s8};

  & > div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.s4};
    margin: ${({ theme }) => theme.spacing.s8} 0;
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.background.default};
  }

  label {
    position: absolute;
    left: ${({ theme }) => theme.spacing.s12};
    top: -${({ theme }) => theme.spacing.s8};
    padding: 0 ${({ theme }) => theme.spacing.s4};
    display: inline-block;
    background: ${({ theme }) => theme.palette.background.default};
    border-radius: ${({ theme }) => theme.borderRadius.input};
    font-size: ${({ theme }) => theme.typography.fontSize.f14};
    color: ${({ theme }) => theme.palette.primary.main};
    transition: opacity 0.3s ease;
    visibility: hidden;
    opacity: 0;
  }

  textarea {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.palette.border.primary};
    padding: ${({ theme }) => `${theme.spacing.s8} ${theme.spacing.s16}`};
    box-sizing: border-box;
    border-radius: ${({ theme }) => theme.borderRadius.input};
    overflow: hidden;
    font-size: ${({ theme }) => theme.typography.fontSize.f16};
    background-color: ${({ theme }) => theme.palette.background.dark};
    &:focus {
      outline-color: ${({ theme }) => theme.palette.border.focused};
      &::placeholder {
        visibility: hidden;
      }
    }
  }
  textarea:focus + label {
    visibility: visible;
    opacity: 1;
  }
  & > span {
    position: absolute;
    left: 1%;
  }
`;

const TextAreaField = ({
  title,
  name,
  value,
  placeholder,
  label,
  required = true,
  editable = true,
  onClick,
  style,
  error,
  register,
  idx,
}) => {
  const theme = useTheme();

  return (
    <FormGroup key={idx && idx}>
      <InputTitle title={title} required={required} />
      <div>
        <textarea
          rows={3}
          style={style}
          name={name}
          {...(register && register(name))}
          placeholder={placeholder}
          value={value}
          required={required}
          readOnly={!editable && "readonly"}
          onClick={onClick}
        />

        <label htmlFor={name} style={{ textTransform: "capitalize" }}>
          {label}
        </label>
      </div>
      {error && <ErrorMessage error={error} />}
    </FormGroup>
  );
};

export default TextAreaField;
