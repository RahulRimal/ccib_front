import React from "react";
import styled, { useTheme } from "styled-components";
import ErrorMessage from "./ErrorMessage";
import InputTitle from "./InputTitle";

const FormGroup = styled.div`
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.s8};

  & > div {
    /* display: flex; */
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

  input {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.palette.border.primary};
    height: ${({ theme }) => theme.sizing.s44};
    padding: ${({ theme }) => `${theme.spacing.s8} ${theme.spacing.s16}`};
    box-sizing: border-box;
    border-radius: ${({ theme }) => theme.borderRadius.input};
    overflow: hidden;
    font-size: ${({ theme }) => theme.typography.fontSize.f16};
    &:focus {
      outline-color: ${({ theme }) => theme.palette.border.focused};
      &::placeholder {
        visibility: hidden;
      }
    }
  }
  input:focus + label {
    visibility: visible;
    opacity: 1;
  }
  & > span {
    position: absolute;
    left: 1%;
  }
`;

const Prefix = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.s12};
`;

const Suffix = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.s12};
`;

const InputField = ({
  title,
  name,
  value,
  placeholder,
  type,
  label,
  required = false,
  editable = true,
  prefix,
  suffix,
  onClick,
  onPrefixClick,
  onSuffixClick,
  style,
  error,
  register,
  idx,
  defaultValue,
}) => {
  const theme = useTheme();
  const textStyles = { ...style };

  return (
    <FormGroup key={idx && idx}>
      <InputTitle title={title} required={required} />
      <div>
        {prefix && <Prefix onClick={onPrefixClick}>{prefix}</Prefix>}
        <input
          style={{
            ...(prefix && { paddingLeft: theme.spacing.s32 }),
            ...textStyles,
          }}
          {...(register && register(name))}
          name={name}
          type={type}
          className="form-control"
          placeholder={placeholder}
          readOnly={!editable && "readonly"}
          onClick={onClick}
          required={required}
          defaultValue={defaultValue}
        />
        {suffix && (
          <Suffix
            onClick={onSuffixClick}
            style={{ cursor: `${onSuffixClick && "pointer"}` }}
          >
            {suffix}
          </Suffix>
        )}

        <label htmlFor={name} style={{ textTransform: "capitalize" }}>
          {label}
        </label>
      </div>
      {error && <ErrorMessage error={error} />}
    </FormGroup>
  );
};

export default InputField;
